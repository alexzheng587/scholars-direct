import 'webrtc-adapter'; // fill correct spec behaviour
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
import { userAction } from "./actions/userAction";
import jwt_decode from "jwt-decode";



store.dispatch(setToken(window.__JWT_TOKEN__));

const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'include', // TODO: change for production
});
let HOST = window.location.origin.replace(/^http/, 'ws')
const wsLink = new WebSocketLink({
    uri: HOST + '/graphql',
    options: {
        reconnect: true,
    },
});


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


ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);
