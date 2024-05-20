import express from "express";
require("dotenv").config()
import cors from 'cors';
import initRoutes from './src/routes'
import connectDatabase from "./src/config/connectDatabase";
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketServices = require('./src/services/socket')
const http = require('http');
const server = http.createServer(app)
const { Server } = require('socket.io');


const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});

global._io = io;

app.use(cookieParser());

// xử lý để body nhận data dạng form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))


app.get('/set-cookie', (req, res) => {
    res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
connectDatabase()

// global._io.on("connection", socketServices.connection)

var onlineUsers = []
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) && 
        onlineUsers.push({
            userId: userId,
            socketId: socket.id
        })
        console.log(onlineUsers)
    })

    socket.emit("socketId", socket.id);

    socket.on("chat", (message) => {
        const userReceiver = onlineUsers.find((user) => user.userId === message.receiver_id)
        console.log(message)
        console.log(userReceiver)
        if( userReceiver) {
            io.to(message.socketId).to(userReceiver.socketId ).emit("chat", message);
        }
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    });
});



const port = process.env.PORT || 8888;
const listen = server.listen(port, () => {
    console.log(`server is run on port ${listen.address().port}`)
})
