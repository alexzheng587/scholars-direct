import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './ui/components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {store} from './helpers/store';
import { split, HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';


// setup mock backend
// import { configureFakeBackend } from './helpers/mockBackend';
// configureFakeBackend();

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'same-origin',
});
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:5000/graphql',
    options: {
        reconnect: true,
    },
});

// const subscriptionMiddleware = {
//     applyMiddleware(options, next) {
//         const { token } = store.getState();
//         options.connectionParams = { authToken: token };
//         next();
//     },
// };
//
// wsLink.subscriptionClient.use([subscriptionMiddleware]);

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
const client = new ApolloClient({ link, cache, connectToDevTools: true });


ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
