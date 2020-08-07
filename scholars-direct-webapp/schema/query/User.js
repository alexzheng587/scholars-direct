import { User } from '../types';

export default {
    type: User,
    name: 'User',
    resolve: (_, args, context) => {
        console.log(context.req.user);
        return context.req.user;
    },
};