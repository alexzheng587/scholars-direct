import initialMessageList from "../reducers/index";
import axios from 'axios';

import {questionConstants} from "../constants/questionConstant";
import {offerConstants} from "../constants/offerConstants";
let messageID = initialMessageList.length;

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

        axios.get(`http://localhost:8080/questions/`)
            .then(res => {
                dispatch(fetchQuestionsSuccess(res.data));
            })
            .catch(e => {
                dispatch(fetchQuestionsFailure(e));
            });
    }
};

export const addQuestionsRequested = () => {
    return {
        type: questionConstants.ADD_REQUEST
    };
};

export const addQuestionsSuccess = (question) => {
    return {
        type: questionConstants.ADD_SUCCESS,
        ...question
    };
};

export const addQuestionsFailure = (e) => {
    return {
        type: questionConstants.ADD_ERROR,
        e
    };
};

export const addQuestion = (Question) => {
    return dispatch => {
        dispatch(addQuestionsRequested());

        axios.post(`http://localhost:8080/questions/`, Question)
            .then(res => {
                dispatch(addQuestionsSuccess(res.data));
            })
            .catch(e => {
                dispatch(addQuestionsFailure(e.message))
            });
    };
};

export const deleteMessageRequested = () => {
    return {
        type: questionConstants.DELETE_REQUEST
    };
};

export const deleteMessageSuccess = (targetQuestionKey) => {
    return {
        type: questionConstants.DELETE_SUCCESS,
        targetQuestionKey
    };
};

export const deleteMessageFailure = (e) => {
    return {
        type: questionConstants.DELETE_ERROR,
        e
    };
};

export const deleteQuestion = (state) => {
    return dispatch => {
        dispatch(deleteMessageRequested());

        axios.delete(`http://localhost:8080/questions/${state.id}`)
            .then(res => {
                dispatch(deleteMessageSuccess(state.key));
            })
            .catch(e => {
                dispatch(deleteMessageFailure(e.message))
            });
    };
};

