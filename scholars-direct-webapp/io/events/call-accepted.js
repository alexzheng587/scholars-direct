import {
    CALL_ACCEPTED,
    CALL_CANCELED,
    ICE_SERVER_CONFIG,
} from '../../client/src/constants/videocall';
import { getSocketById } from '../helpers';

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket which received the event
 * @param {Object} payload from the call accepted event
 * @returns {undefined}
 */
const iceservers = [
    {
        url: "stun:stun.l.google.com:19302"
    },
    {
        url: 'turn:numb.viagenie.ca:3478',
        username: "alex_ander587@hotmail.com",
        credential: "Alex1956370",
    },
    {
        url: 'stun:numb.viagenie.ca:3478',
        username: "alex_ander587@hotmail.com",
        credential: "Alex1956370",
    },
]
export default async function callAccepted(io, socket, { toId }) {
    console.log(`Call from ${toId} to ${socket.id} accepted. Establishing peer connection`);
    try {
        const toSocket = getSocketById(io, toId);
        if (!toSocket) {
            socket.emit(CALL_CANCELED);
            return;
        }
        toSocket.emit(CALL_ACCEPTED, { iceServerConfig: iceservers });
        socket.emit(ICE_SERVER_CONFIG, { iceServerConfig: iceservers });
    } catch (err) {
        console.log(err);
        socket.emit(CALL_CANCELED);
    }
}