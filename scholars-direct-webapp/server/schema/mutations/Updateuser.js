import {GraphQLString} from 'graphql';
import { MutationResponse } from '../types';
import pubsub, { USER_UPDATE } from '../subscriptions/pubsub';
//import validateEmail from '../../../lib/validate-email';

export default {
    type: MutationResponse,
    name: 'UpdateUser',
    args: {
        newEmail: { type: GraphQLString },
        newUsername: { type: GraphQLString },
    },
    async resolve(parent, { newEmail, newUsername }, req) {
        try {
            if (newEmail) {
                // const { success: validEmail } = await validateEmail(newEmail);
                // if (!validEmail) return { success: false, message: 'Please enter a valid email address.' };
                req.user.email = newEmail;
            }
            if (newUsername) req.user.username = newUsername;
            await req.user.save();
            await pubsub.publish(USER_UPDATE, { userId: req.user.id });
            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false };
        }
    },
};

