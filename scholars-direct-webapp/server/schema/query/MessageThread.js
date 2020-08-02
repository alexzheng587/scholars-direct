import { GraphQLID } from 'graphql';
import { MessageThread } from '../types';
import ModelMessageThread from '../../models/message_thread';

export default {
    type: MessageThread,
    name: 'MessageThread',
    args: {
        threadId: { type: GraphQLID },
    },
    async resolve(parent, { threadId }, context) {
        const thread = await ModelMessageThread.findOne({
            $and: [
                {
                    _id: threadId,
                },
                {
                    $or: [
                        {user1: context.req.user && context.req.user._id},
                        {user2: context.req.user && context.req.user._id},
                    ]
                }
            ]
        })
            .populate({path: "messages", options: {sort: {createdAt: -1}}})
            .populate('user1')
            .populate('user2')
            .exec();
        return thread;
    },
};
