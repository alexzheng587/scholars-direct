import {GraphQLList} from 'graphql';
import { Contact } from '../types';
import ModelContact from '../../models/contact';

export default {
    type: new GraphQLList(Contact),
    name: 'Contact',
    async resolve(parent, args, context) {
        try {
            const contacts = await ModelContact.find({
                $and: [
                    {
                        blocker_id: null
                    },
                    {
                        $or: [
                            {user1: context.req.user._id},
                            {user2: context.req.user._id}
                        ]
                    }
                ]
            })
                .populate('user1')
                .populate('user2');
            let currentID = String(context.req.user._id);
            // grab only the user info of the other contact
            for (let idx in contacts) {
                if (String(contacts[idx].user1._id) === currentID)
                    contacts[idx].user1 = undefined;
                if (String(contacts[idx].user2._id) === currentID)
                    contacts[idx].user2 = undefined;
            }
            console.log(contacts);
            return contacts;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};