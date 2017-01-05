const socket = io();

// Arrow function might crash on mobile phones
socket.on('connect', function () {
    console.log('Connected to server');
    console.log(socket);

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

socket.on('newUser', function(message) {
    console.log('newUser');

    showMessage(message);
});

socket.on('userJoined', function(message) {
    console.log('userJoined');

    showMessage(message);
})

socket.on('newMessage', function(message) {
    console.log('newMessage', message);

    showMessage(message);
});

socket.on('createMessage', function(message) {
    console.log('createMessage', message);
});

$(document).ready(function() {
    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        console.log('Invoking submit');

        const message = $('#message').val();

        socket.emit('createMessage', {
            from: 'User',
            text: message
        }, function () {

        });
    });
});

function showMessage(message) {
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
}