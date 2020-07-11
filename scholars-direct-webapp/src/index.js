import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './ui/components/App';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import setAuthToken from "./helpers/setAuthToken";
import jwt_decode from "jwt-decode";
import {userAction} from "./actions/userAction";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(userAction.setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(userAction.logout());
        // Redirect to login
        window.location.href = "./login";
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
