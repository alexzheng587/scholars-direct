const app = require('./app').default;
const http = require("http");
const getUserStatus = require('./io/get-user-status').default;
const getUserSocketId = require('./io/get-user-socketid').default;
const initIO = require('./io').default;

const server = http.createServer(app);
app.io = initIO(server);

app.get('/user/:userid/status', getUserStatus);
app.get('/user/:userid/socket-id', getUserSocketId);

/**
 * onListen callback for server
 * @returns {undefined}
 */
function onListen() {
    console.log(`Listening on port 4000`);
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
}

/**
 * onError callback
 * @param {Error} err the error
 * @returns {undefined}
 */
function onError(err) {
    if (err.syscall !== 'listen') throw err;

    const bind = typeof port === 'string' ? `Pipe 4000` : `Port 4000`;

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
server.listen(4000);