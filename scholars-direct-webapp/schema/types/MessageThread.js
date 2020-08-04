import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} from 'graphql';
import User from './User';
import Message from './Message';

export default new GraphQLObjectType({
    name: 'MessageThread',
    fields: {
        id: {
            type: GraphQLID,
            resolve: thread => thread.id,
        },
        user: {
            type: User,
            resolve: thread => (thread.user1 || thread.user2),
        },
        messages: {
            type: new GraphQLList(Message),
            resolve: thread => thread.messages.reverse(),
        },
        latestMessage: {
            type: Message,
            resolve: thread => thread.messages[0],
        },
    },
});