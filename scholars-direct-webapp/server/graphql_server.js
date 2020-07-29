import { ApolloServer } from 'apollo-server-express';
import debug from 'debug';
import { createServer } from 'http';
import { buildContext } from 'graphql-passport';
import User from './models/user';
import initPassport from './helper/passport';

initPassport({ User });

const app = require('./app').default;
const mySchema = require('./schema').default;
const passport = require('passport');


app.use(passport.initialize());
app.use(passport.session());

const apolloServer = new ApolloServer({
    schema: mySchema,
    context: ({ req, res }) => buildContext({ req, res })
});

apolloServer.applyMiddleware({ app, cors: false });

const server = createServer(app);
apolloServer.installSubscriptionHandlers(server);

/**
 * onListen callback for server
 * @returns {undefined}
 */
function onListen() {
    console.log(`Listening on port 5000`);
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

/**
 * onError callback
 * @param {Error} err the error
 * @returns {undefined}
 */
function onError(err) {
    if (err.syscall !== 'listen') throw err;

    const bind = typeof port === 'string' ? `Pipe 5000` : `Port 5000`;

    switch (err.code) {
        case 'EACCESS':
            console.log(`${bind} requires elevated privilege`);
            break;
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            break;
        default:
            throw err;
    }
}

server.on('listening', onListen);
server.on('error', onError);
server.listen(5000, () => {
    console.log(`🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:5000${apolloServer.subscriptionsPath}`);
});