import {initialQuestionList} from '../constants/questionConstant';
import {questionConstants} from "../constants/questionConstant";

const initialState = {
    questionList: [],
    isQuestionsLoading: false,
    questionError: null
};

export const questions = (state = initialState, action) => {
    switch (action.type) {
        case questionConstants.FETCH_REQUEST:
            return {
                ...state,
                isQuestionsLoading: true
            };
        case questionConstants.FETCH_SUCCESS:
            return {
                ...state,
                questionList: action.questions,
                isQuestionsLoading: false
            };
        case questionConstants.FETCH_ERROR:
            return {
                ...state,
                isQuestionsLoading: false,
                questionError: action.e
            };
        case questionConstants.ADD_REQUEST:
            return {
                ...state,
                isQuestionsLoading: true
            };
        case questionConstants.ADD_SUCCESS:
            return {
                ...state,
                questionList: state.questionList.concat({
                    _id: action._id,
                    userId: action.userId,
                    title: action.title,
                    username: action.username,
                    description: action.description,
                    time: action.time,
                    status: action.status,
                    tags: action.tags
                }),
                isQuestionsLoading: false
            };
        case questionConstants.ADD_ERROR:
            return {
                ...state,
                isQuestionsLoading: false,
                questionError: action.e
            };
        case questionConstants.DELETE_REQUEST:
            return {
                ...state,
                isQuestionsLoading: true
            };
        case questionConstants.DELETE_SUCCESS:
            let newQuestions = state.questionList.slice(0);
            newQuestions.splice(action.targetQuestionKey, 1);
            return {
                ...state,
                questionList: newQuestions,
                isQuestionsLoading: false
            };
        case questionConstants.DELETE_ERROR:
            return {
                ...state,
                isQuestionsLoading: false,
                questionError: action.e
            };
        default:
            return state;
    }
};