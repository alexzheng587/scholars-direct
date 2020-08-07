import {GraphQLID, GraphQLList, GraphQLString} from 'graphql';
import {Profile} from '../types';
import ModelUser from '../../models/user';
export default {
    type: Profile,
    name: 'Profile',
    async resolve(parent, args, context) {
        try {
            console.log(context.req.user._id);
            const thing = await ModelUser.findById(context.req.user._id);
            return thing;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};