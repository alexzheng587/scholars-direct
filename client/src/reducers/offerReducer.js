export const offers = (offerList = [], action) => {
    if (action.type === "OFFER_HELP") {
         offerList.push({
            pid: action.pid,
            tutorID: action.tutorID,
            posterID: action.posterID,
            time: action.time,
            status: action.status,
        });
         return offerList;
    } else {
        return offerList;
    }
};