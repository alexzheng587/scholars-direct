import {GraphQLList, GraphQLString, GraphQLID} from "graphql";
import { MutationResponse } from "../types";
import ModelQuestion from "../../models/Question";

export default {
    type: MutationResponse,
    name: 'DeleteQuestion',
    args: {
        questionId: { type: GraphQLID },
    },
    async resolve(parent, args, context) {
        try {
            await ModelQuestion.findByIdAndDelete(args.questionId);
            return { success: true, message: 'success' };
        } catch (err) {
            console.log(err);
            return { success: false, message: err };
        }
    },
};