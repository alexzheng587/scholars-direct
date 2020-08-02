import { GraphQLID } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import { Message } from '../types';
import pubsub from './pubsub';
import { MESSAGE_READ } from './constants';
import MessageModel from '../../models/message'

export default {
    name: 'MessageRead',
    type: Message,
    args: {
        forThreadId: { type: GraphQLID },
    },
    async resolve({ messageId }) {
        try {
            console.log("Message Read Subscription");
            const message = await MessageModel.findById(messageId);
            return message;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_READ),
        ({ threadId }, { forThreadId }) => (threadId === forThreadId)
    ),
};