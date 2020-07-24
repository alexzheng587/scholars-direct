import { GraphQLList, GraphQLInt } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import { USER_UPDATE } from './constants';
import { User } from '../types';
import ModelUser from '../../models/user'
import pubsub from './pubsub';

export default {
    name: 'UserUpdate',
    type: User,
    args: {
        userIds: { type: new GraphQLList(GraphQLInt) },
    },
    async resolve({ userId }) {
        const user = await ModelUser.findById(userId);
        return user;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(USER_UPDATE),
        ({ userId }, { userIds }) => userIds.includes(userId),
    ),
};