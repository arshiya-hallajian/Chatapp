const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    }
})

io.on('connection', (socket) => {
    console.log(socket.id);


    socket.on("send_message", (message) =>  {

        socket.to(message.room).emit("receive_message", message);
        console.log(message);
    })


    socket.on("join_chat", (room) => {
        socket.on("Username", (user) => {
            socket.join(room);
            console.log(`user ${socket.id} (${user}) connected to ${room}`);
        })

    })


    socket.on("disconnect", () => {
        console.log("user disconnected",socket.id);
    })
})

server.listen(3001, ()=>{
    console.log("server is running");
})