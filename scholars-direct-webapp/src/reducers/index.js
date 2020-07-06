import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { questions } from './questionReducer';
import {offers} from "./offerReducer";



export default combineReducers({
    questions,
    authentication,
    registration,
    alert,
    offers
});