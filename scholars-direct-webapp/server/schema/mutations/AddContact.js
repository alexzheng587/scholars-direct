import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLID,
} from 'graphql';
//import { CONTACT_REQUEST_ACCEPTED } from '../subscriptions/constants';
import pubsub from '../subscriptions/pubsub';
import ContactModel from '../../models/contact'
import UserModel from '../../models/user';
import MutationResponse from "../types/MutationResponse";

export default {
    type: MutationResponse,
    name: 'AddUserRequest',
    args: {
        requestId: { type: GraphQLID },
    },
    async resolve(parent, { userId }, context) {
        try {
            const user = await UserModel.findOne(userId);
            if (!user) return { success: false, message: 'No user found' };

            let contact = await ContactModel.create(
                {
                    user_1: context.req.user._id,
                    user_2: userId,
                }
            );
            await contact.save();

            pubsub.publish(CONTACT_REQUEST_ACCEPTED, {
                user1: context.req.user._id,
                user2: userId,
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
