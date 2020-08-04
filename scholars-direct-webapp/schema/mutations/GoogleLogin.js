import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLBoolean,
} from 'graphql';
import jwt from 'jsonwebtoken';

const LoginResponse = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        token: { type: GraphQLString },
    },
});


export default {
    type: LoginResponse,
    name: 'GoogleLogin',
    args: {
        title: { type: GraphQLString },
        username: { type: GraphQLString },
        description: { type: GraphQLString },
        time: { type: GraphQLString },
        status: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent, args, context) {
        try {
            let newQuestion = await new ModelQuestion({
                title: args.title,
                username: args.username,
                description: args.description,
                time: args.time,
                status: args.status,
                tags: args.tags
            });
            newQuestion = await newQuestion.save();
            return newQuestion;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};