import { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLString } from 'graphql';
import MessageThreadModel from '../../models/message_thread';

export default {
    type: new GraphQLObjectType({
        name: 'CreateMessageThreadResponse',
        fields: {
            success: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            threadId: { type: GraphQLID },
        },
    }),
    name: 'CreateMessageThread',
    args: {
        contactId: { type: GraphQLID },
    },
    async resolve(parent, { contactId }) {
        try {
            const contact = await MessageThreadModel.findById(contactId);
            if (!contact) return { success: false, message: 'That contact is no longer reachable' };
            const thread = await new MessageThreadModel({
                contact_id: contactId,
                user1: contact.user1,
                user2: contact.user2,
            });
            await thread.save();
            return { success: true, message: 'Success', threadId: thread._id };
        } catch (err) {
            console.log(err);
            return { success: false, message: 'Something went wrong creating your message' };
        }
    },
};