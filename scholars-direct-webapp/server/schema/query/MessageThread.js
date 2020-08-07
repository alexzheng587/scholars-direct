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
        let currentID = String(context.req.user._id);
        // grab only the user info of the other contact
        if (String(thread.user1._id) === currentID)
            thread.user1 = undefined;
        if (String(thread.user2._id) === currentID)
            thread.user2 = undefined;

        return thread;
    },
};
