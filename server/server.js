const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected. ID: ${socket.id}`);

    socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('userJoined', generateMessage('Admin', 'New user joined'));
        
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server!'); // event acknowledgement
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

    /* Sample code for .emit and .on
    // This emits a message from server.js to index.js (.emit())
    socket.emit('newEmail', {
        from: 'huseinr@outlook.com',
        to: 'someone@gmail.com',
        subject: 'Sample subject',
        body: 'This is a sample email body'
    });

    // This listens to a message arriving from client to server (.on())
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });
    */