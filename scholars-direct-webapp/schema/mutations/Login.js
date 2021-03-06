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
            if (!user) return { success: false, message: 'No user with that email' };
            context.login(user);
            const token = jwt.sign({ id: user.id, email: user.email }, 'bad_secret', { expiresIn: 24 * 60 * 60 * 1000});
            context.res.cookie('cookieName', token, { signed: true, maxAge: Date.now() + (24 * 60 * 60 * 1e3) });
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