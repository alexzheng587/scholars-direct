import { userConstants } from '../constants/userConstant';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: false, user: {}, google:false, loading: false, userId: {} } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                google: false
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                google: false,
                user: action.user,
                userId: action.userId
            };
        case userConstants.GOOGLE_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                google: true,
                user: action.user,
                userId: action.userId
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                user: {},
                loggedIn: false};
        default:
            return state
    }
}