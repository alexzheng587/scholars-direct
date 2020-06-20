import initialMessageList from "../reducers/index";

let messageID = initialMessageList.length;

export const addQuestion = (state) => {
    return {
        type: "ADD_QUESTION",
        id: messageID++,
        title: state.title,
        username: state.username,
        description: state.description,
        time: state.time,
        status: state.status
    };
};

export const deleteQuestion = (qid) => {
    return {
        type: "DELETE_QUESTION",
        qid
    };
};

export const login = (user) => {
    return {
        type: "LOGIN",
        user
    };
};

export const offerHelp = (state) => {
    return {
        type: "OFFER_HELP",
        tutorID: state.tutor,
        posterID:state.poster,
        pid:state.pid,
        message: state.message,
        time: state.time,
        isAccepted: false,
    };
};
