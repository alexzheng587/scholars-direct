import {
    GraphQLID,
    GraphQLList} from 'graphql';
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
            console.log(contacts);
            return contacts;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};