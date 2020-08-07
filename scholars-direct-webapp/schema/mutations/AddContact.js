import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLID,
} from 'graphql';
import {CONTACT_REQUEST_ACCEPTED, MESSAGE_CREATED} from '../subscriptions/constants';
import pubsub from '../subscriptions/pubsub';
import ContactModel from '../../models/contact'
import UserModel from '../../models/user';
import MutationResponse from "../types/MutationResponse";
import MessageThreadModel from "../../models/message_thread";
import MessageModel from "../../models/message";

export default {
    type: MutationResponse,
    name: 'AddContact',
    args: {
        requestId: { type: GraphQLID },
        requestMessage: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
        try {
            const user = await UserModel.findOne({_id: args.requestId});
            if (!user) return { success: false, message: 'No user found' };

            const previousContact = await ContactModel.find({
                $or: [
                    {
                        $and: [
                            {user1: args.requestId},
                            {user2: context.req.user._id}
                        ]
                    },
                    {
                        $and: [
                            {user1: context.req.user._id},
                            {user2: args.requestId}
                        ]
                    }
                ]
            });
            if (previousContact !== undefined && !(previousContact.length == 0)) {
                const thread = await MessageThreadModel.findOne({
                    $or: [
                        {
                            $and: [
                                {user1: args.requestId},
                                {user2: context.req.user._id},
                            ]
                        },
                        {
                            $and: [
                                {user1: context.req.user._id},
                                {user2: args.requestId},
                            ]
                        }
                    ]
                });
                const message = await new MessageModel({
                    body: args.requestMessage,
                    thread_id: thread._id,
                    sender_id: context.req.user._id,
                    recipient_id: args.requestId,
                    createdAt: new Date(),
                });
                thread.messages.push(message);
                await message.save();
                await thread.save();

                pubsub.publish(MESSAGE_CREATED, {
                    user1: message.sender_id,
                    user2: message.recipient_id,
                    messageId: message.id,
                });
                return {
                    success: true,
                    message: 'Contact already added',
                };
            }
            let contact = await ContactModel.create(
                {
                    user1: context.req.user._id,
                    user2: args.requestId,
                    lastInteractedAt: new Date()
                }
            );
            await contact.save();

            await pubsub.publish(CONTACT_REQUEST_ACCEPTED, {
                user1: context.req.user._id,
                user2: args.requestId,
            });

            const thread = await new MessageThreadModel({
                user1: context.req.user._id,
                user2: args.requestId,
                contactId: contact._id,
                lastMessageAt: new Date(),
                createdAt: new Date()
            });

            const message = await new MessageModel({
                body: args.requestMessage,
                thread_id: thread._id,
                sender_id: context.req.user._id,
                recipient_id: args.requestId,
                createdAt: new Date(),
            });
            thread.messages.push(message);
            await message.save();
            await thread.save();

            pubsub.publish(MESSAGE_CREATED, {
                user1: message.sender_id,
                user2: message.recipient_id,
                messageId: message.id,
            });

            return {
                success: true,
                message: 'Contact request accepted',
            };
        } catch (err) {
            console.log(err);
            return { success: false, message: 'Something went wrong responding to the contact request' };
        }
    },
};