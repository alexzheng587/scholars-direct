import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
} from 'graphql';
import User from './User';
export default new GraphQLObjectType({
    name: 'MutationResponse',
    fields: {
        success: { type: GraphQLBoolean },
        result: { type: User},
        message: { type: GraphQLString },
    },
});