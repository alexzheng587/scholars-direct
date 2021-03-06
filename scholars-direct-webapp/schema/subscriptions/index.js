import { GraphQLObjectType } from 'graphql';

import UserStatusChange from './UserStatusChange';
import UserUpdate from './UserUpdate';
import UserTyping from './UserTyping';
import MessageCreated from './MessageCreated';
import MessageRead from './MessageRead';

export default new GraphQLObjectType({
    name: 'SubscriptionRoot',
    fields: {
        UserStatusChange,
        UserUpdate,
        UserTyping,
        MessageCreated,
        MessageRead,
    },
});