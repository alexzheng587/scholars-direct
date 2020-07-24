
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

export const calls = (state = defaultCall, action) => {
    switch (action.type) {
        case "SET_CALL_STATUS_TO_AVAILABLE":
            return {
                ...state,
                status: action.payload
            }
    }
};