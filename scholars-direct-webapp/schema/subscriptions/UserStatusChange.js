import { GraphQLList, GraphQLID } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import { USER_STATUS_CHANGE } from './constants';
import { User } from '../types';
import pubsub from './pubsub';
import UserModel from '../../models/user'

export default {
    name: 'UserStatusChange',
    type: User,
    args: {
        userIds: { type: new GraphQLList(GraphQLID) },
    },
    async resolve({ userId }) {
        const user = await UserModel.findById(userId);
        return user;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(USER_STATUS_CHANGE),
        ({ userId }, { userIds }) => userIds.includes(userId),
    ),
};