import { CALL_IGNORED } from '../../../src/constants/videocall';
import getSocketById from '../helpers/get-socket-by-id';

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
export default function handleCallIgnored(io, socket, { toId }) {
    console.log(`Call from ${toId} ignored by ${socket.id}`);
    const toSocket = getSocketById(io, toId);
    return toSocket && toSocket.emit(CALL_IGNORED);
}