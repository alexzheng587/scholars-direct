import { userConstants } from '../constants/userConstant';
import { alertActions } from './alertLogin';
import { history } from '../helpers/history';
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
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

function login(user) {
    return dispatch => {
        axios
            .post("/users/login", user)
            .then(res => {
                // Save to localStorage
                // Set token to localStorage
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                // Set token to Auth header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
            })
            .catch(err =>
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    payload: err.response.data
                })
            );

    };
}
function googleLogin(user) {
    const options = {
        method: 'POST',
        body: user,
        mode: 'cors',
        cache: 'default'
    };
    return dispatch => {
    fetch('http://localhost:9000/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        console.log('x-auth-token',token)
        r.json().then(user => {
            if (token) {
                dispatch(setCurrentUser(user));
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

function setCurrentUser(decoded) {
    return {
        type: userConstants.LOGIN_SUCCESS,
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