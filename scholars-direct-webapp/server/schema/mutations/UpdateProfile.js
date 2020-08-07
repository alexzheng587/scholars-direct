import {GraphQLString, GraphQLInt} from 'graphql';
import { MutationResponse } from '../types';
import pubsub, { USER_UPDATE } from '../subscriptions/pubsub';
import ModelUser from "../../models/user";
//import validateEmail from '../../../lib/validate-email';

export default {
    type: MutationResponse,
    name: 'UpdateProfile',
    args: {
        fullname: { type: GraphQLString },
        school: { type: GraphQLString },
        major: { type: GraphQLString },
        year: { type: GraphQLInt },
        role: { type: GraphQLString },
        // // new
        // id: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
        try {
            let updateOBJ ={ "$set": {
                "fullname": args.fullname,
                    "school": args.school,
                    "major": args.major,
                    "year": args.year,
                    "role": args.role,
                    }
            };
            // await ModelUser.findByIdAndUpdate(context.req.user._id,updateOBJ,{new:true},function (err,result) {
        // ,function (err,result) {
        //         if (err){
        //             return {"success": false, message: err};
        //         } else {
        //             return {"success": true, message:result};
        //         }
        //     }
            await ModelUser.findByIdAndUpdate(context.req.user._id,updateOBJ);
            return {"success": true, message:"OK"};
        } catch (err) {
            console.log(err);
            return { success: false, message: "Fail" };
        }
    },


};

