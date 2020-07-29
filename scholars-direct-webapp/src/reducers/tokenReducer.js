const defaultToken = {
    token: null
};

export const token = (state = defaultToken, action) => {
    if (action.type === "SET_TOKEN") {
        return { token: action.token };
    } else {
        return state;
    }
};