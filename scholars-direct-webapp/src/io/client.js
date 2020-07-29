import io from 'socket.io-client';
import { store } from '../helpers/store';
//import store from '../store';
import attachEventHandlers from './events';

const connect = token => io.connect('http://localhost:4000', { query: token });

let { token } = store.getState();
let socket = connect(token);
attachEventHandlers(socket);

store.subscribe(() => {
    const { token: newToken } = store.getState();
    if (newToken === token) return;
    if (socket) socket.disconnect();
    socket = null;
    if (newToken) socket = connect(newToken);
    console.log(newToken);
    if (socket) attachEventHandlers(socket);
    token = newToken;
});

export default () => socket;
