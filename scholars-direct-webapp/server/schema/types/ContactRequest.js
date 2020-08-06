import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from 'graphql';
import moment from 'moment';
import User from './User';

export default new GraphQLObjectType({
    name: 'ContactRequest',
    fields: {
        id: {
            type: GraphQLID,
            description: 'the request\'s unique ID',
            resolve: request => request.id,
        },
        createdAt: {
            type: GraphQLString,
            description: 'when the request was created',
            resolve: request => moment(request.createdAt).toISOString(),
        },
        sender: {
            type: User,
            description: 'the user who send the request',
            resolve: request => request.sender,
        },
        recipient: {
            type: User,
            description: 'the user who received the request',
            resolve: request => request.recipient,
        },
        senderMessage: {
            type: GraphQLString,
            description: 'the initial user of the request sender',
            resolve: request => request.senderMessage,
        },
    },
});