import { GraphQLID, GraphQLString } from 'graphql';
import { MutationResponse } from '../types';
import pubsub, { MESSAGE_CREATED } from '../subscriptions/pubsub';
import MessageThreadModel from '../../models/message_thread';
import MessageModel from '../../models/message';
import ContactModel from '../../models/contact';

export default {
    type: MutationResponse,
    name: 'CreateMessageResponse',
    args: {
        threadId: { type: GraphQLID },
        body: { type: GraphQLString },
    },
    async resolve(parent, { threadId, body }, context) {
        try {
            const thread = await MessageThreadModel.findById(threadId);
            if (!thread) throw new Error(`No message thread with id: ${threadId}`);
            let message = await new MessageModel({
                body: body,
                thread_id: threadId,
                sender_id: context.req.user._id,
                recipient_id: thread.user1 === context.req.user._id ? thread.user2 : thread.user1,
                createdAt: new Date(),
            });
            thread.messages.push(message);
            await message.save();
            thread.lastMessageAt = new Date();
            await thread.save();
            await ContactModel.updateOne({_id: thread.contactId}, { $set: {lastInteractedAt: new Date()}});
            console.log(thread);
            console.log(message);
            // await models.sequelize.transaction(async (transaction) => {
            //     message = await models.message.create(
            //         {
            //             body,
            //             thread_id: threadId,
            //             sender_id: req.user.id,
            //             recipient_id: thread.user_1 === req.user.id ? thread.user_2 : thread.user_1,
            //         },
            //         { transaction }
            //     );
            //     thread.lastMessageAt = new Date();
            //     await thread.save({ transaction });
            //     await models.contact.update(
            //         { lastInteractedAt: new Date() },
            //         { where: { id: thread.contact_id }, transaction },
            //     );
            // });
            pubsub.publish(MESSAGE_CREATED, {
                user1: message.sender_id,
                user2: message.recipient_id,
                messageId: message.id,
            });
            return { success: true, message: 'Message sent' };
        } catch (err) {
            console.log(err);
            return { success: false, message: 'Something went wrong sending your message' };
        }
    },
};
