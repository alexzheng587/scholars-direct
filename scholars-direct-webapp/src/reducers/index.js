import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { questions } from './questionReducer';
import { errors } from './errorReducer';
import {offers} from "./offerReducer";



export default combineReducers({
    questions,
    authentication,
    registration,
    errors,
    alert,
    offers,
});