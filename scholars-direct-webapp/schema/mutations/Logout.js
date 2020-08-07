import { MutationResponse } from '../types';

export default {
    type: MutationResponse,
    name: 'LogoutUser',
    resolve(parent, args, context) {
        try {
            context.logout();
            console.log("logged out");
        } catch (err) {
            console.log(err);
            return { success: false };
        }
        return { success: true };
    },
};