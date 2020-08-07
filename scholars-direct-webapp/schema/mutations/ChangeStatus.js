import {GraphQLID, GraphQLString} from "graphql";
import {MutationResponse} from "../types";
import ModelQuestion from "../../models/Question";

export default {
    type: MutationResponse,
    name: 'ChangeStatus',
    args: {
        questionId: { type: GraphQLID },
        status: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
        try {
            await ModelQuestion.findByIdAndUpdate(args.questionId, {
                status: args.status,
            });
            return { success: true, message: 'success' };
        } catch (err) {
            console.log(err);
            return { success: false, message: err };
        }
    },
};