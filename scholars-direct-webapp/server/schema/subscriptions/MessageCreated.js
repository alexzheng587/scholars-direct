import { GraphQLID } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import { Message } from '../types';
import pubsub, { MESSAGE_CREATED } from './pubsub';
import MessageModel from '../../models/message'

export default {
    type: Message,
    name: 'MessageCreated',
    args: {
        forUserId: { type: GraphQLID },
    },
    async resolve({ messageId }) {
        try {
            console.log("Message created subscription");
            console.log(messageId);
            const message = await MessageModel.findById(messageId);
            return message;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_CREATED),
        ({ user1, user2 }, { forUserId }) => (forUserId === user1 || forUserId === user2),
    ),
};