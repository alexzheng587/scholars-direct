import { userConstants } from '../constants/userConstant';
import { alertActions } from './alertLogin';
import { history } from '../helpers/history';
import { store } from '../helpers/store';
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import {setToken} from "./authtoken";
import jwt_decode from "jwt-decode";

export const userAction = {
    login,
    logout,
    register,
    setCurrentUser,
    registerLoading,
    setUserLoading,
    googleLogin
};

export function login(user, token) {
    return dispatch => {
        localStorage.setItem("jwtToken", token);
        let userid = jwt_decode(token);
        dispatch(setCurrentUser(user, userid.id));
        setAuthToken(token);
        history.push('/');
        // dispatch(request({ username }));
        //
        // userService.login(username, password)
        //     .then(
        //         user => {
        //             dispatch(success(user));
        //             history.push('/');
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };
}

// function login(user) {
//     return dispatch => {
//         axios
//             .post("/users/login", user)
//             .then(res => {
//                 // Save to localStorage
//                 // Set token to localStorage
//                 const { token } = res.data;
//                 localStorage.setItem("jwtToken", token);
//                 // Set token to Auth header
//                 setAuthToken(token);
//                 // Decode token to get user data
//                 const decoded = jwt_decode(token);
//                 // Set current user
//                 console.log("Login_res:",res)
//                 dispatch(setCurrentUser(decoded));
//             })
//             .catch(err =>
//                 dispatch({
//                     type: userConstants.LOGIN_FAILURE,
//                     payload: err.response.data
//                 })
//             );
//     };
// }

function googleLogin(user) {
    const options = {
        method: 'POST',
        body: user,
        mode: 'cors',
        cache: 'default'
    };
    return dispatch => {
        fetch('http://localhost:9000/auth/google', options)
            .then(r => {
                const token = r.headers.get('x-auth-token');
                console.log('r', r)
                console.log('x-auth-token', token)
                r.json().then(user => {
                    if (token) {
                        dispatch(setGoogleCurrentUser(user));
                        history.push("/") // re-direct to login on successful register
                    }
                });
            })
            .catch(err =>
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    payload: err.response.data
                })
            );
    };
}

function setCurrentUser(decoded, id) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        user: decoded,
        userId: id
    };
}

function setGoogleCurrentUser(decoded) {
    return {
        type: userConstants.GOOGLE_LOGIN_SUCCESS,
        user: decoded
    };
}

function currentLogout(decoded) {
    return {
        type: userConstants.LOGOUT,
        user: decoded
    };
}

function setUserLoading () {
    return {
        type: userConstants.LOGIN_REQUEST
    };
}

function registerLoading () {
    return {
        type: userConstants.REGISTER_REQUEST
    };
}

function logout() {
    return dispatch => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        setToken(null);
        // Set current user to empty object {} which will set isAuthenticated to false
        dispatch(currentLogout({}));
    };
}

function register(user) {
    return dispatch => {
        axios
            .post("/users/register", user)
            .then(res => history.push("/login")) // re-direct to login on successful register
            .catch(err => {
                    dispatch({
                        type: userConstants.REGISTER_FAILURE,
                        payload: err.response.data
                    });
                }
            );
    };
}
