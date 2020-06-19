import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';

const initialQuestionList = [
    {
    "title": "How to solve this calculus problem?",
    "username": "Bob103",
    "description": "I need help with math 101 homework, here is the question: x+y=z....",
    "time": "23:24",
    "status": "In progress"
    },
    {
    "title": "Need help debugging",
    "username": "Ecoli123123",
    "description": "My code is an absolute mess and the due date is fast approaching. I need someone to take a look at my spaghetti code ",
    "time": "23:20",
    "status": "In progress"
    },
    {
    "title": "Lorem Ipsum",
    "username": "IE",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "time": "12:24",
    "status": "In progress"
    },
    {
    "title": "Some help on English Essay Topic",
    "username": "Shakespeaare",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna et pharetra. Tortor at risus viverra adipiscing at in. Nisl suscipit adipiscing bibendum est.",
    "time": "14:07",
    "status": "In progress"
    }];

// add reducers below and add to combineReducers
const questionListReducer = (questionList = initialQuestionList, action) => {
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
}

export default combineReducers({
    questions: questionListReducer,
    authentication,
    registration,
    alert
});