import { GraphQLList, GraphQLString } from 'graphql';
import User from '../types/User';
import ModelUser from '../../models/user';

export default {
    type: new GraphQLList(User),
    name: 'Users',
    args: {
        query: { type: GraphQLString },
    },
    async resolve(parent, { query }, context) {
        if (!query) return [];
        try {
            const iLikeQuery = { $regex: '.*' + query + '.*' };
            const users = await ModelUser.find({
                $and: [
                    {
                        id: {$ne: context.req.user && context.req.user._id},
                    },
                    {
                        $or: [
                            {email: iLikeQuery},
                            {username: iLikeQuery},
                        ],
                    }
                ]
            }).sort([['username', 'asc']]);
            return users;
        } catch (err) {
            console.log(err);
            return [];
        }
    },
};