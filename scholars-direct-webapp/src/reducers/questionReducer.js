import {initialQuestionList} from '../constants/questionConstant';

// add reducers below and add to combineReducers
export const questions = (questionList = initialQuestionList, action) => {
    if (action.type === "ADD_QUESTION") {
        return questionList.concat({
            title: action.title,
            username: action.username,
            description: action.description,
            time: action.time,
            status: action.status
        });
    } else if (action.type === "DELETE_QUESTION") {
        let newQuestions = questionList.slice(0);
        newQuestions.splice(action.qid, 1);
        return newQuestions;
    } else {
        return questionList;
    }
};