const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected. ID: ${socket.id}`);

    socket.emit('newUser', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().toString()
    });

    socket.broadcast.emit('userJoined', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().toString()
    });

    /*
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

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: message.createdAt
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toString()
        // });
    });

    // socket.emit('newMessage', {
    //     from: 'User 2',
    //     text: 'Message from User 2',
    //     createdAt: new Date().toString()
    // });
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});