import { GraphQLObjectType } from 'graphql';
import User from './User';
import Users from './Users'
import MessageThread from "./MessageThread";
import MessageThreads from './MessageThreads';

export default new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
        User,
        Users,
        MessageThread,
        MessageThreads,
    },
});