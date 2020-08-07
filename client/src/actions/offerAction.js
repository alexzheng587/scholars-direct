import axios from 'axios';

import {questionConstants} from "../constants/questionConstant";
import {offerConstants} from "../constants/offerConstants";

function helper() {
        return {
            type: "OFFER_HELP",
        };
}

export const offerHelp = (state) => {
    return dispatch => {
        dispatch(helper());
        console.log(state);
        axios.post('http://localhost:9000/offers/',state);

    };
};




// export const offerHelp = (state) => {
//     return {
//         type: "OFFER_HELP",
//         tutorID: state.tutor,
//         posterID:state.poster,
//         pid:state.pid,
//         message: state.message,
//         time: state.time,
//         isAccepted: false,
//     };
// };
