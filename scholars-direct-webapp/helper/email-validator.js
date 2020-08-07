const Validator = require("validator");
const isEmpty = require("is-empty");

// maybe add dns lookup to get rid of spammy emails
export default function validateEmail(emailAddr) {
// Email checks
    if (Validator.isEmpty(emailAddr)) {
        return {success: false}
    } else if (!Validator.isEmail(emailAddr)) {
        return {success: false}
    }
    return {
        success: true
    };
}