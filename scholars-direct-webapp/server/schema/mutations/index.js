import { GraphQLObjectType } from 'graphql';
import Login from './Login';
import Logout from './Logout';
import SignupUser from "./Signup";
import Updateuser from "./Updateuser";
import UpdateProfile from "./UpdateProfile";
import ReadMessage from "./ReadMessage";
import UserTyping from "./UserTyping";
import CreateMessage from "./CreateMessage";
import AddQuestion from "./AddQuestion";
import DeleteQuestion from "./DeleteQuestion";
import ChangeStatus from "./ChangeStatus";
import AddContact from "./AddContact";
import GoogleLogin from "./GoogleLogin";
import CreateMessageThread from "./CreateMessageThread";

export default new GraphQLObjectType({
    name: 'MutationRoot',
    fields: {
        Login,
        Logout,
        SignupUser,
        Updateuser,
        UpdateProfile,
        ReadMessage,
        UserTyping,
        CreateMessage,
        AddQuestion,
        DeleteQuestion,
        ChangeStatus,
        AddContact,
        GoogleLogin,
        CreateMessageThread
    },
});