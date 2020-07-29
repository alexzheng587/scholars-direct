import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { questions } from './questionReducer';
import { filterTags } from './filterTagReducer';
import { errors } from './errorReducer';
import { offers } from "./offerReducer";

const rootReducer = combineReducers({
    questions,
    filterTags,
    authentication,
    registration,
    errors,
    alert,
    offers,
});

export default rootReducer;