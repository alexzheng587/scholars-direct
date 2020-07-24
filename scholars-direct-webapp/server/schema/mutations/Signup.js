import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLBoolean,
} from 'graphql';
import jwt from 'jsonwebtoken';
import validateEmail from '../../helper/email-validator';
import User from '../../models/user';

const SignupResponse = new GraphQLObjectType({
    name: 'SignupResponse',
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        token: { type: GraphQLString },
    },
});

export default {
    type: SignupResponse,
    name: 'SignupUser',
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, { email, username, password }, context) {
        try {
            const { success: validEmail } = await validateEmail(email);
            if (!validEmail) {
                return {
                    success: false,
                    message: 'Please enter a valid email address',
                };
            }
            let res = await User.findOne({ username: username.trim() }, { email: email.trim().toLowerCase() }).exec();
            if (res) return { success: false, message: 'There is already an account with that email/username' };
            let newUser = await new User({
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password: password,
                lastInteractedAt: Date.now(),
                createdAt: Date.now()
            });
            newUser = await newUser.save();
            context.login(newUser);
            const token = jwt.sign({ id: newUser.id }, 'bad_secret', { expiresIn: 24 * 60 * 60 });
            context.res.cookie('cookieName', token, { signed: true, maxAge: Date.now() + (24 * 60 * 60 * 1e3) });
            return {
                success: true,
                message: 'success',
                token,
            };
        } catch (err) {
            console.log(err);
            return { success: false, message: err };
        }
    },
};