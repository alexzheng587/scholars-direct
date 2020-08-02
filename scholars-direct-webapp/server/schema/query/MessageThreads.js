import { GraphQLList } from 'graphql';
import moment from 'moment';
import { MessageThread } from '../types';
import MessageThreadModel from '../../models/message_thread'

export default {
    type: new GraphQLList(MessageThread),
    name: 'MessageThreads',
    async resolve(parent, args, context) {
        try {
            const threads = await MessageThreadModel.find({
                $or: [
                    {user1: context.req.user && context.req.user._id},
                    {user2: context.req.user && context.req.user._id},
                ]})
                .populate({path: "messages", options: {sort: {createdAt: -1}}})
                // .populate({path: "messages"})
                .populate('user1')
                .populate('user2');
            console.log(threads[0].messages);
            let currentID = String(context.req.user._id);
            // grab only the user info of the other contact
            for (let idx in threads) {
                if (String(threads[idx].user1._id) === currentID)
                    threads[idx].user1 = undefined;
                if (String(threads[idx].user2._id) === currentID)
                    threads[idx].user2 = undefined;
            }
            const hasUnreadMessage = thread => (
                thread.messages[0].sender_id !== context.req.user.id
                && !thread.messages[0].readAt
            );
            const defaultCompare = (a, b) => (
                moment(b.messages[0].createdAt) - moment(a.messages[0].createdAt)
            );

            return threads.filter(({ messages }) => messages.length).sort((a, b) => {
                if (hasUnreadMessage(a) && hasUnreadMessage(b)) return defaultCompare(a, b);
                if (hasUnreadMessage(a)) return -1;
                if (hasUnreadMessage(b)) return 1;
                return defaultCompare(a, b);
            });
        } catch (err) {
            console.log(err);
            return [];
        }
    },
};