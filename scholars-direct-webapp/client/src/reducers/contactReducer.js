const defaultToken = {
    query: ''
};

export const contacts = (state = defaultToken, action) => {
    if (action.type === "SET_CONTACTS_SEARCH_QUERY") {
        return { query: action.query };
    } else {
        return state;
    }
};