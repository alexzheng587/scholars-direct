import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { questions } from './questionReducer';
import { offers } from "./offerReducer";
import { call } from "./callReducer";
import { token } from './tokenReducer';
import { contacts } from './contactReducer';



export default combineReducers({
    questions,
    authentication,
    registration,
    alert,
    offers,
    token,
    call,
    contacts
});