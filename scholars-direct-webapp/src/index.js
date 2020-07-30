import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './ui/components/App';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import { split, HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setToken } from "./actions/authtoken";


// setup mock backend
// import { configureFakeBackend } from './helpers/mockBackend';
// configureFakeBackend();

store.dispatch(setToken(window.__JWT_TOKEN__));

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include', // TODO: change for production
});
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:5000/graphql',
    options: {
        reconnect: true,
    },
});

const subscriptionMiddleware = {
    applyMiddleware(options, next) {
        const { token } = store.getState();
        options.connectionParams = { authToken: token };
        next();
    },
};

wsLink.subscriptionClient.use([subscriptionMiddleware]);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
    },
    wsLink,
    httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link: link , cache: cache, connectToDevTools: true });

// import setAuthToken from "./helpers/setAuthToken";
// import jwt_decode from "jwt-decode";
// import {userAction} from "./actions/userAction";
//
// // Check for token to keep user logged in
// if (localStorage.jwtToken) {
//     // Set auth token header auth
//     const token = localStorage.jwtToken;
//     setAuthToken(token);
//     // Decode token and get user info and exp
//     const decoded = jwt_decode(token);
//     // Set user and isAuthenticated
//     store.dispatch(userAction.setCurrentUser(decoded));
// // Check for expired token
//     const currentTime = Date.now() / 1000; // to get in milliseconds
//     if (decoded.exp < currentTime) {
//         // Logout user
//         store.dispatch(userAction.logout());
//         // Redirect to login
//         window.location.href = "./login";
//     }
// }

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);
