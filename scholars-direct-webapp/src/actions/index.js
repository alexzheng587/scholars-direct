export const addQuestion = (state) => {
    return {
        type: "ADD_QUESTION",
        title: state.title,
        username: state.username,
        description: state.description,
        time: state.time,
        status: state.status
    };
};

export const deleteQuestion = (state) => {
    return {
        type: "DELETE_QUESTION",
        message: state.question,
        user: state.user
        // more props needed to be added
    };
};