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

const admin = require('./src/config/configFirebaseAdmin')

const allowedOrigins = ["http://localhost:3000", "https://zv440rvb-3000.asse.devtunnels.ms"];


const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});


app.use(cookieParser());

// xử lý để body nhận data dạng form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    // origin: (origin, callback) => {
    //     if (allowedOrigins.includes(origin)) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },

    methods: ["GET", "POST", "PUT", "DELETE"]
}))


// app.get('/set-cookie', (req, res) => {
//     res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
//     res.send('Cookie has been set');
// });


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
connectDatabase()


// xử lý kết nói từ namespace '\chat'
const chatNamespace = io.of('/chat');
var onlineUsers = []
chatNamespace.on('connection', (socket) => {
    console.log('a user chat connected');
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId: userId,
                socketId: socket.id
            })
        console.log(onlineUsers)
    })

    chatNamespace.emit("socketId", socket.id);

    socket.on("chat", (message) => {
        const userReceiver = onlineUsers.find((user) => user.userId === message.receiver_id)
        console.log(message)
        console.log(userReceiver)
        if (userReceiver) {
            chatNamespace.to(message.socketId).to(userReceiver?.socketId).emit("chat", message);
        } else {
            console.log("send to sender")
            chatNamespace.to(message.socketId).emit("chat", message);
        }
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    });
});


// xử lý kết nói từ namespace '\booking'
const bookingNamespace = io.of('/booking');
global.bookingNamespace = bookingNamespace;

// online user là danh sách user đang online có dạng {userId, socketId}
global.onlineUsers2 = []

// xác nhận đã có garage nhận lịch
let firstBookingConfirmed = false;

global.bookingNamespace.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("addUser", (userId) => {
        !global.onlineUsers2.some((user) => user.userId === userId) &&
            global.onlineUsers2.push({
                userId: userId,
                socketId: socket.id
            })
        console.log(global.onlineUsers2)
    })


    // socket.on("booking", (bookingDetail) => {
    //     const receiver = onlineUsers2.find((user) => user.userId === bookingDetail.receiverId)
    //     console.log(bookingDetail)
    //     console.log(receiver)
    //     if( receiver) {
    //         bookingNamespace.to(receiver.socketId ).emit("booking", bookingDetail);
    //     }
    // })

    socket.on("confirmBooking", () => {
        const garageConfirm = global.onlineUsers2.find(user => user.socketId === socket.id)
        if (!firstBookingConfirmed && garageConfirm) {
            firstBookingConfirmed = true;
            // gửi socket tới customer (ko cần đâu chỉ cần gửi thông báo là đc r)
            // gửi thông báo
            admin.messaging().send({
                notification: {
                    title: "Infor",
                    body: `garage ${garageConfirm.userId} have to confirm your booking, please reload page to get address`
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default',
                        },
                    },
                },
                token: 'customer token fcm'
            })
                .then(res => console.log(JSON.stringify(res)))
                .catch(err => console.log(JSON.stringify(err)))
        }
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        global.onlineUsers2 = global.onlineUsers2.filter(user => user.socketId !== socket.id)
    });
});



const sendToDevices = () => {

}

const port = process.env.PORT || 8888;
const listen = server.listen(port, () => {
    console.log(`server is run on port ${listen.address().port}`)
})
