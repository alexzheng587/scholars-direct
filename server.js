const express = require("express");
const http = require("http");
const app = express();
const formatMessage = require('./utils/messages');
const socketAuth = require('socketio-auth');
const adapter = require('socket.io-redis');

const redisAdapter = adapter({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || 'password',
});

let broadcaster;
const port = 3000;

const server = http.createServer(app);
const io = require("socket.io")(server);
//io.adapter(redisAdapter);

const botName = 'Scholar Bot';

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

app.use(express.static(__dirname + "/public"));

let connectedClients = [];
let rooms = [];
const id = "" + Math.floor(Math.random() * 1000) + Date.now();

io.sockets.on("error", e => console.log(e));
io.sockets.on("connection", socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        if (getRoomUsers(room).length < 2) {
            socket.join(user.room);

            // Welcome current user
            socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit(
                    'message',
                    formatMessage(botName, `${user.username} has joined the chat`)
                );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
    socket.on("broadcaster", () => {
        broadcaster = socket.id;
        socket.broadcast.emit("broadcaster");
    });
    socket.on("watcher", () => {
        socket.to(broadcaster).emit("watcher", socket.id);
    });
    socket.on("offer", (id, message) => {
        socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id, message) => {
        socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
        socket.to(id).emit("candidate", socket.id, message);
    });
    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
    // Handle Screen Share event
    socket.on('initiate', () => {
        io.emit('initiate');
    });
});
server.listen(port, () => console.log(`Server is running on port ${port}`));