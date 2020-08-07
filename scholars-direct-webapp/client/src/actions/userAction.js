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
    };
}

export function googleLogin(user, token) {
    return dispatch => {
        localStorage.setItem("jwtToken", token);
        let userid = jwt_decode(token);
        dispatch(setGoogleCurrentUser(user, userid.id));
        setAuthToken(token);
        history.push("/");
    }
}

function setCurrentUser(decoded, id) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        user: decoded,
        userId: id
    };
}

function setGoogleCurrentUser(decoded, id) {
    return {
        type: userConstants.GOOGLE_LOGIN_SUCCESS,
        user: decoded,
        userId: id
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

export function logout() {
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
