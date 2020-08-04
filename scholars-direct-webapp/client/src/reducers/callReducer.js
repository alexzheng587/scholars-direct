import { CallStatuses } from '../constants/callStatus';

const defaultCall = {
    status: CallStatuses.Available,
    callingContactId: null,
    callingSocketId: null,
    iceServerConfig: null,
    remoteDescription: null,
    iceCandidate: null,
    videoEnabled: true,
    audioEnabled: true,
};

export const call = (state = defaultCall, action) => {
    switch (action.type) {
        case "SET_CALL_STATUS_TO_AVAILABLE":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_TESTING":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_CALLING":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_CALL_FAILED":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_RECEIVING_CALL":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_ACCEPTING_CALL":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_IN_CALL":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALL_STATUS_TO_HANGING_UP":
            return {
                ...state,
                status: action.payload
            };
        case "SET_CALLING_CONTACT_ID":
            return {
                ...state,
                callingContactId: action.payload
            };
        case "CLEAR_CALLING_CONTACT_ID":
            return {
                ...state,
                callingContactId: null
            };
        case "SET_ICE_SERVER_CONFIG":
            return {
                ...state,
                iceServerConfig: action.payload
            };
        case "CLEAR_ICE_SERVER_CONFIG":
            return {
                ...state,
                iceServerConfig: null
            };
        case "SET_REMOTE_DESCRIPTION":
            return {
                ...state,
                remoteDescription: action.payload
            };
        case "CLEAR_REMOTE_DESCRIPTION":
            return {
                ...state,
                remoteDescription: null
            };
        case "SET_CALLING_SOCKET_ID":
            return {
                ...state,
                callingSocketId: action.payload
            };
        case "CLEAR_CALLING_SOCKET_ID":
            return {
                ...state,
                callingSocketId: null
            };
        case "SET_ICE_CANDIDATE":
            return {
                ...state,
                iceCandidate: action.payload
            };
        case "CLEAR_ICE_CANDIDATE":
            return {
                ...state,
                iceCandidate: null
            };
        case "TOGGLE_VIDEO_TRACK":
            return {
                ...state,
                videoEnabled: !state.videoEnabled
            };
        case "TOGGLE_AUDIO_TRACK":
            return {
                ...state,
                audioEnabled: !state.audioEnabled
            };
        default:
            return state;
    }
};