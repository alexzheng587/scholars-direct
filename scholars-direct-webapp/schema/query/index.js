import { GraphQLObjectType } from 'graphql';
import User from './User';
import Users from './Users'
import MessageThread from "./MessageThread";
import MessageThreads from './MessageThreads';
import Contact from "./Contact";
import Contacts from "./Contacts";
import Questions from "./Questions";
import Profile from "./Profile";

export default new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
        User,
        Users,
        MessageThread,
        MessageThreads,
        Contact,
        Contacts,
        Questions,
        Profile
    },
});