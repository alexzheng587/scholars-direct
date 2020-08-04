import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Question',
    fields: {
        _id: {
            type: GraphQLID,
            description: "unique ID of the question",
            resolve: question => question._id,
        },
        title: {
            type: GraphQLString,
            description: "Title of the question",
            resolve: question => question.title,
        },
        username: {
            type: GraphQLString,
            description: "Display name of the user that specified the question",
            resolve: question => question.username,
        },
        description: {
            type: GraphQLString,
            description: "The description of the question provided by the user",
            resolve: question => question.description,
        },
        time: {
            type: GraphQLString,
            description: "The submission time of the question",
            resolve: question => question.time,
        },
        status: {
            type: GraphQLString,
            description: "The current status of the question",
            resolve: question => question.status,
        },
        tags: {
            type: new GraphQLList(GraphQLString),
            description: "The tags of the question",
            resolve: question => question.tags,
        },
    },
});