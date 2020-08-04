import {
    GraphQLObjectType,
    GraphQLID,
} from 'graphql';
import User from './User';

export default new GraphQLObjectType({
    name: 'Contact',
    fields: {
        id: {
            type: GraphQLID,
            resolve: contact => contact.id,
        },
        user: {
            type: User,
            resolve: contact => (contact.user2 || contact.user1),
        },
    },
});