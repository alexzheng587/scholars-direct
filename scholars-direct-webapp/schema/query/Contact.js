import { GraphQLID } from 'graphql';
import { Contact } from '../types';
import ModelContact from '../../models/contact';

export default {
    type: Contact,
    name: 'Contact',
    args: {
        contactId: { type: GraphQLID },
    },
    async resolve(parent, { contactId }, context) {
        try {
            const contact = await ModelContact.findById(contactId)
                .populate('user1')
                .populate('user2');
            return contact;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};