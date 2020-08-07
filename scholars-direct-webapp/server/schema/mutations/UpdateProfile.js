import {GraphQLString, GraphQLInt} from 'graphql';
import { MutationResponse } from '../types';
import pubsub, { USER_UPDATE } from '../subscriptions/pubsub';
import ModelUser from "../../models/user";
//import validateEmail from '../../../lib/validate-email';

export default {
    type: MutationResponse,
    name: 'UpdateProfile',
    args: {
        newFullname: { type: GraphQLString },
        newSchool: { type: GraphQLString },
        newMajor: { type: GraphQLString },
        newYear: { type: GraphQLInt },
        newRole: { type: GraphQLString },

    },
    async resolve(parent, args, context) {
        try {
            let updateOBJ ={ "$set": {
                "fullname": args.newFullname,
                    "school": args.newSchool,
                    "major": args.newMajor,
                    "year": args.newYear,
                    "role": args.newRole}
            };
            ModelUser.findByIdAndUpdate(context.req.user._id,updateOBJ,{new:true},function (err,result) {
                if (err){
                    return {"success": false, result: err};
                } else {
                    return {"success": true, result:result};
                }
            })
        } catch (err) {
            console.log(err);
            return { success: false };
        }
    },


};

