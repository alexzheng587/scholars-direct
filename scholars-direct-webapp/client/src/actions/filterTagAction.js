import {filterTagConstants} from "../constants/filterTagConstant.js";

export const addFilterTag = (tag) => {
    return {
        type: filterTagConstants.ADD_FILTER_TAG,
        tag
    };
};

export const removeFilterTag = (tag) => {
    return {
        type: filterTagConstants.REMOVE_FILTER_TAG,
        tag
    };
};