import { userConstants } from '../constants/userConstant';
import { userService } from '../services/userService';
import { alertActions } from './alertLogin';
import { history } from '../helpers/history';
import { store } from '../helpers/store';

export const userAction = {
    login,
    logout,
    register
};

export function login(user) {
    return dispatch => {
        dispatch(success(user));
        console.log(store.getState());
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

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}