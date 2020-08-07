import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLBoolean,
} from 'graphql';
import { authenticateGoogle } from "../../helper/google-passport";
import GoogleUser from "../../models/GoogleUser";

const GoogleLoginResponse = new GraphQLObjectType({
    name: 'GoogleLoginResponse',
    fields: {
        success: { type: GraphQLBoolean },
        name: { type: GraphQLString },
        token: { type: GraphQLString },
    },
});

export default {
    type: GoogleLoginResponse,
    name: 'GoogleLogin',
    args: {
        token: { type: GraphQLString },
    },
    async resolve(_, args, { req, res }) {
        req.body = {
            ...req.body,
            access_token: args.token,
        };

        try {
            const { data, info } = await authenticateGoogle(req, res);

            if (data) {
                const user = await GoogleUser.upsertGoogleUser(data);

                if (user) {
                    return ({
                        success: true,
                        name: user.name,
                        token: user.generateJWT(),
                    });
                }
            }

            if (info) {
                console.log(info);
                switch (info.code) {
                    case 'ETIMEDOUT':
                        return { success: false, message: 'Something went wrong logging you in' };
                    default:
                        return { success: false, message: 'Something went wrong logging you in' };
                }
            }
            return { success: false, message: 'Something went wrong logging you in' };
        } catch (err) {
            console.log(err);
            return { success: false, message: 'Something went wrong logging you in' };
        }
    },
};