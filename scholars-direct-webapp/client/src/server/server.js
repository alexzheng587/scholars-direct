const express = require("express");
const http = require("http");
const app = express();
// const socketAuth = require('socketio-auth');
// const adapter = require('socket.io-redis');
//
// const redisAdapter = adapter({
//     host: process.env.REDIS_HOST || 'localhost',
//     port: process.env.REDIS_PORT || 6379,
//     password: process.env.REDIS_PASS || 'password',
// });

const port = 8080;

const server = http.createServer(app);
const io = require("socket.io")(server);
//io.adapter(redisAdapter);

io.sockets.on("error", e => console.log(e));
io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.roomId);
        socket.room = data.roomId;
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        if(sockets.length===1) {
            socket.emit('init')
        }
        else {
            if (sockets.length===2){
                io.to(data.roomId).emit('ready')
            } else {
                socket.room = null;
                socket.leave(data.roomId);
                socket.emit('full');
            }

        }
    });
    socket.on('signal', (data) => {
        io.to(data.room).emit('desc', data.desc)
    });
    socket.on('disconnect', () => {
        const roomId = Object.keys(socket.adapter.rooms)[0];
        if (socket.room){
            io.to(socket.room).emit('disconnected');
        }

    })
});
server.listen(port, () => console.log(`Server is running on port ${port}`));