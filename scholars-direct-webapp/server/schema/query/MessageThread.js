import { GraphQLInt } from 'graphql';
import { MessageThread } from '../types';
import ModelMessageThread from '../../models/message_thread';

export default {
    type: MessageThread,
    name: 'MessageThread',
    args: {
        threadId: { type: GraphQLInt },
    },
    async resolve(parent, { threadId }, req) {
        // const notCurrentUser = () => ({ id: req.user && { [Op.ne]: req.user.id } });

        const thread = await ModelMessageThread.findOne({
            $and: [
                {
                    id: threadId,
                },
                {
                    $or: [
                        {user_1: req.user && req.user.id},
                        {user_2: req.user && req.user.id},
                    ]
                }
            ]
        })
            .populate({path: "messages", options: { sort: [['createdAt', 'desc']]}})
            .populate('user1')
            .populate('user2')
            .exec();

        //     order: [[{ model: models.message, as: 'messages' }, 'createdAt', 'DESC']],
        //     include: [
        //         {
        //             model: models.contact,
        //             as: 'contact',
        //             where: { blocker_id: null },
        //         },
        //         {
        //             model: models.user,
        //             as: 'user1',
        //             required: false,
        //             where: notCurrentUser(),
        //         },
        //         {
        //             model: models.user,
        //             as: 'user2',
        //             required: false,
        //             where: notCurrentUser(),
        //         },
        //         {
        //             model: models.message,
        //             as: 'messages',
        //         },
        //     ],
        // });
        return thread;
    },
};
