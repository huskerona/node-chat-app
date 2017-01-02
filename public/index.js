const socket = io();

// Arrow function might crash on mobile phones
socket.on('connect', function () {
    console.log('Connected to server');
    console.log(socket);

    const idElem = document.getElementById('id');

    if (idElem) {
        idElem.innerHTML = socket.id;
    } else {
        console.log('Cannot access span tag with ID="id"');
    }

    /*
    // Client emits a message to the server
    socket.emit('createEmail', {
        to: 'someone@gmail.com',
        text: 'Hello World!!!'
    });
    */

    // socket.emit('createMessage', {
    //     from: 'User1',
    //     text: 'Message created'
    // })
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newEmail', function(email) {
    console.log('New email');
    console.log(email);
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    const msg = document.getElementById('msg');

    if (msg) {
        msg.innerHTML = `From: ${message.from}\nText: ${message.text}\nCreate At: ${message.createdAt}\n========\n`;
    }
});

socket.on('createMessage', function(message) {
    console.log('createMessage', message);
})