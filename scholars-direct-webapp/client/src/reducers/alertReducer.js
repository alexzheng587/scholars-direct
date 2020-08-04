import { alertConstants } from '../constants/alertConstant';

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {
                ...state,
                errors: {}
            };
        default:
            return state
    }
}