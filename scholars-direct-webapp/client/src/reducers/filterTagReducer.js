import {filterTagConstants} from "../constants/filterTagConstant.js";

export const filterTags = (activeTags = [], action) => {
    switch (action.type) {
        case filterTagConstants.ADD_FILTER_TAG:
            return [...activeTags, action.tag];
        case filterTagConstants.REMOVE_FILTER_TAG:
            return activeTags.filter((t) => t !== action.tag);
        default:
            return activeTags;
    }
};