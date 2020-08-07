import { GraphQLID } from 'graphql';
import { MutationResponse } from '../types';
import pubsub, { MESSAGE_READ } from '../subscriptions/pubsub';
import MessageModel from "../../models/message"

export default {
    name: 'ReadMessage',
    type: MutationResponse,
    args: {
        messageId: { type: GraphQLID },
    },
    async resolve(parent, { messageId }, context) {
        try {
            console.log(messageId);
            const message = await MessageModel.findById(messageId);
            console.log(message);
            if (!message) return { success: false };
            message.readAt = new Date();
            await message.save();
            pubsub.publish(MESSAGE_READ, {
                messageId: message.id,
                threadId: message.thread_id,
            });
            return { success: true };
        } catch (err) {
            console.log(err);
            return { success: false };
        }
    },
};
