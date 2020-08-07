import io from 'socket.io-client';
import { store } from '../helpers/store';
import attachEventHandlers from './events';

let HOST = window.location.origin;
const connect = token => io(HOST, { query: token }, {transports: [ 'websocket' ]});

let { token } = store.getState();
let socket = connect(token);
attachEventHandlers(socket);

store.subscribe(() => {
    const { token: newToken } = store.getState();
    if (newToken === token) return;
    console.log("New token, reconnect required");
    if (socket) socket.disconnect();
    socket = null;
    if (newToken) socket = connect(newToken);
    console.log(newToken);
    if (socket) attachEventHandlers(socket);
    token = newToken;
    console.log(socket);
});

export default () => socket;
