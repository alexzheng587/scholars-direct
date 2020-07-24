import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLBoolean,
} from 'graphql';
import jwt from 'jsonwebtoken';

const LoginResponse = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        token: { type: GraphQLString },
    },
});

export default {
    type: LoginResponse,
    name: 'LoginUser',
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, { email, password }, context) {
        try {
            const { user } = await context.authenticate('graphql-local', { email, password });
            //const user = await models.User.findOne({ $or: [{email: email}, {username: email}]}).exec();
            if (!user) return { success: false, message: 'No user with that email' };
            context.login(user);
            //if (!(await models.User.comparePassword(password))) return { success: false, message: 'Invalid email/password' };
            const token = jwt.sign({ id: user.id }, 'bad_secret', { expiresIn: 24 * 60 * 60 });
            context.res.cookie('cookieName', token, { signed: true, maxAge: Date.now() + (24 * 60 * 60 * 1e3) });
            console.log(context.req);
            return {
                success: true,
                message: 'success',
                token,
            };
        } catch (err) {
            console.log(err);
            return { success: false, message: 'Something went wrong logging you in' };
        }
    },
};