import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLID,
} from 'graphql';
import { CONTACT_REQUEST_ACCEPTED } from '../subscriptions/constants';
import pubsub from '../subscriptions/pubsub';
import ContactModel from '../../models/contact'
import UserModel from '../../models/user';
import MutationResponse from "../types/MutationResponse";

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

            console.log(args.requestId);
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
            console.log(previousContact);
            if (previousContact) {
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
                //senderMessage: args.requestMessage
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
