export const addError = (payload) => {
    return {
        type: 'ADD_ERROR',
        payload
    };
};

export const clearError = () => {
    let payload = '';
    return {
        type: 'CLEAR_ERROR',
        payload
    };
};