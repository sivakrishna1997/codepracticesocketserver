// require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const app = express();
// const db = require('./db');
const cors = require("cors");
const path = require('path');
// const { success, error } = require("./helpers/ResponseHandler")
// global.moment = require('moment');
// global._ = require('lodash');
// global.success = success;
// global.error = error;

const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "*",
//         methods: ['GET', 'POST', 'PUT', 'DELETE']
//     }
// })


// app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log("socket connected::", socket.id)

    socket.emit("mySicketId", socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("call ended");
    });

    // socket.on('setsharescreen', (data) => {
    //     io.to(data.projectId).emit("getscreenshare", data);
    // });
    // socket.on('joinscreenshare', (data) => {
    //     io.to(data.socketId).emit("acceptscreenshare", data.signal);
    // });


    socket.on('setsharescreen', (data) => {
        io.emit("getscreenshare", data);
    });
    socket.on('joinscreenshare', (data) => {
        io.emit("acceptscreenshare", data.signal);
    });

})

// app.use('/api/v1', require('./routs'));

// app.use(express.static(path.join(__dirname, './public')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// })


const port = process.env.PORT || 3004;
server.listen(port, () => {
    console.log('Server is Up Listinng on PORT ' + port);
})