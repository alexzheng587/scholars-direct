import { userConstants } from '../constants/userConstant';
const initialState = {};
export function errors (state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_FAILURE:
            console.log("!!!!!!!!!")
            return action.payload;
        case userConstants.REGISTER_FAILURE:
            console.log("REGISTER_FAILURE")
            return {
                ...state,
                errors: action.payload
            };
        default:
            return state;

    }
}