import { GraphQLObjectType } from 'graphql';
import Login from './Login';
import Logout from './Logout';
import Signup from "./Signup";
import Updateuser from "./Updateuser";
import AddQuestion from "./AddQuestion";
import DeleteQuestion from "./DeleteQuestion";
import ChangeStatus from "./ChangeStatus";

export default new GraphQLObjectType({
    name: 'MutationRoot',
    fields: {
        Login,
        Logout,
        Signup,
        Updateuser,
        AddQuestion,
        DeleteQuestion,
        ChangeStatus
    },
});