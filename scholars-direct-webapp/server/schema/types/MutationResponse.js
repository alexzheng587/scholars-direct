import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'MutationResponse',
    fields: {
        success: { type: GraphQLBoolean },
        result: { type: GraphQLObject},
        message: { type: GraphQLString },
    },
});