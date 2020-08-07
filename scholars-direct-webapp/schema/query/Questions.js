import {GraphQLID, GraphQLList, GraphQLString} from 'graphql';
import {Question} from '../types';
import ModelQuestion from '../../models/Question';

export default {
    type: new GraphQLList(Question),
    name: 'Questions',
    async resolve(parent, args, context) {
        try {
            const questions = await ModelQuestion.find();
            console.log("questions have been queried");
            return questions;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};