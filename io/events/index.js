import handleCallAccepted from './call-accepted';
import handleCallCanceled from './call-canceled';
import handleCallIgnored from './call-ignored';
import handleCallRequest from './call-request';
import handleCallHangUp from './call-hang-up';
import handleDisconnect from './disconnect';
import handleIceCandidate from './ice-candidate';
import handleIceDescription from './ice-description';

const handlers = {
    ["call:accepted"]: handleCallAccepted,
    ["call:canceled"]: handleCallCanceled,
    ["call:ignored"]: handleCallIgnored,
    ["call:request"]: handleCallRequest,
    ["call:hangup"]: handleCallHangUp,
    ["disconnect"]: handleDisconnect,
    ["ice:candidate"]: handleIceCandidate,
    ["ice:description"]: handleIceDescription,
};

export default (io, socket) =>
    Object.keys(handlers).forEach(event =>
        socket.on(event, handlers[event].bind(null, io, socket)));