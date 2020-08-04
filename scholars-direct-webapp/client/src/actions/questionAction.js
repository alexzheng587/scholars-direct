import axios from 'axios';

import {questionConstants} from "../constants/questionConstant";

export const fetchQuestionsRequested = () => {
    return {
        type: questionConstants.FETCH_REQUEST
    };
};

export const fetchQuestionsSuccess = (questions) => {
    return {
        type: questionConstants.FETCH_SUCCESS,
        questions
    };
};

export const fetchQuestionsFailure = (e) => {
    return {
        type: questionConstants.FETCH_ERROR,
        e
    };
};

export const fetchQuestions = () => {
    return dispatch => {
        dispatch(fetchQuestionsRequested());

        axios.get(`http://localhost:3000/questions/`)
            .then(res => {
                dispatch(fetchQuestionsSuccess(res.data));
            })
            .catch(e => {
                dispatch(fetchQuestionsFailure(e));
            });
    }
};

export const addQuestionRequested = () => {
    return {
        type: questionConstants.ADD_REQUEST
    };
};

export const addQuestionSuccess = (question) => {
    return {
        type: questionConstants.ADD_SUCCESS,
        ...question
    };
};

export const addQuestionFailure = (e) => {
    return {
        type: questionConstants.ADD_ERROR,
        e
    };
};

export const addQuestion = (Question) => {
    return dispatch => {
        dispatch(addQuestionRequested());

        axios.post(`http://localhost:3000/questions/`, Question)
            .then(res => {
                dispatch(addQuestionSuccess(res.data));
            })
            .catch(e => {
                dispatch(addQuestionFailure(e.message))
            });
    };
};

export const deleteQuestionRequested = () => {
    return {
        type: questionConstants.DELETE_REQUEST
    };
};

export const deleteQuestionSuccess = (targetQuestionKey) => {
    return {
        type: questionConstants.DELETE_SUCCESS,
        targetQuestionKey
    };
};

export const deleteQuestionFailure = (e) => {
    return {
        type: questionConstants.DELETE_ERROR,
        e
    };
};

export const deleteQuestion = (state) => {
    return dispatch => {
        dispatch(deleteQuestionRequested());

        axios.delete(`http://localhost:3000/questions/${state.id}`)
            .then(res => {
                dispatch(deleteQuestionSuccess(state.key));
            })
            .catch(e => {
                dispatch(deleteQuestionFailure(e.message))
            });
    };
};

