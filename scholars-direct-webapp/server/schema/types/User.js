import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql';
import axios from 'axios';

export default new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {
            type: GraphQLID,
            description: 'the user\'s unique ID',
            resolve: user => user._id,
        },
        email: {
            type: GraphQLString,
            description: 'the user\'s email',
            resolve: user => user.email,
        },
        username: {
            type: GraphQLString,
            description: 'the username',
            resolve: user => user.username,
        },
        status: {
            type: GraphQLString,
            description: 'the contacts current status: available or offline',
            async resolve(user) {
                const { data } = await axios.get(`http://localhost:4000/user/${user._id}/status`);
                return data.status;
            },
        },
        socketId: {
            type: GraphQLString,
            description: 'the id of the socket the user is currently connected to',
            async resolve(user) {
                const { data } = await axios.get(`http://localhost:4000/user/${user.id}/socket-id`);
                return data.socketId;
            },
        },

        // new
        role: {
            type: GraphQLString,
            description: 'the role',
            resolve: user => user.role,
        },
        school: {
            type: GraphQLString,
            description: 'the school',
            resolve: user => user.school,
        },
        major: {
            type: GraphQLString,
            description: 'the major or faulty',
            resolve: user => user.major,

        },
        year: {
            type: GraphQLInt,
            description: 'The Year Level (1-4)',
            resolve: user => user.year,

        },
        fullname: {
            type: GraphQLString,
            description: 'Full name',
            resolve: user => user.fullname,
        },

    },
});