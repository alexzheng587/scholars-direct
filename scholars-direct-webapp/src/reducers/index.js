import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { questions } from './questionReducer';



export default combineReducers({
    questions,
    authentication,
    registration,
    alert
});