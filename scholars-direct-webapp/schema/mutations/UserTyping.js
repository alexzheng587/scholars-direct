import { MutationResponse } from '../types';
import pubsub, { USER_TYPING } from '../subscriptions/pubsub';

export default {
    type: MutationResponse,
    name: 'UserTypingResponse',
    resolve(parent, { userTyping }, context) {
        try {
            pubsub.publish(USER_TYPING, { userTyping: context.req.user && context.req.user.id });
            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false };
        }
    },
};
