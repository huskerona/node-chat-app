
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

socket.on('newLocation', function(message) {
    const li = $('<li></li>');
    const timestamp = moment(message.createdAt);
    const a = $(`<a target="_blank">My Location</a>`);
    const span = $('<span></span>');
    span.text(`[${timestamp.format('h:mm:ss a')}] - `);
    
    a.attr('href', message.url);

    li.append(span);
    li.append(a);

    $('#messages').append(li);
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

    $('#sendGeoLocation').on('click', function(e) {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(loc) {
                socket.emit('createLocationMessage', {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude
                });
            }, function() {
                alert('Cannot retrieve location');
            });
        } else {
            alert('GeoLocation not enabled.');
        }
    });
});

function showMessage(message) {
    var li = $('<li></li>');
    const timestamp = moment(message.createdAt);
    li.text(`[${timestamp.format('h:mm:ss a')}] - ${message.from}: ${message.text}`);

    $('#messages').append(li);
}