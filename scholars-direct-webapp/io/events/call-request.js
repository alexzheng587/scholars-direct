import { CALL_REQUEST, CALL_UNAVAILABLE } from '../../client/src/constants/videocall';
import { getSocketById, getContactBySocketIds } from '../helpers';

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
export default async function handleCallRequest(io, socket, { toId }) {
    console.log(`Call request from ${socket.id} to call ${toId}`);
    const toSocket = getSocketById(io, toId);
    if (!toSocket) socket.emit(CALL_UNAVAILABLE);
    let contactId;
    try {
        contactId = await getContactBySocketIds(io, toId, socket.id);
        console.log(contactId);
    } catch (err) {
        console.log(err);
        socket.emit(CALL_UNAVAILABLE);
    }
    toSocket.emit(CALL_REQUEST, { fromId: socket.id, contactId });
}