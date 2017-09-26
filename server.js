var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 8080;
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
    response.sendfile('public/index.html');
});

app.get('/:id', function(request, response){
    response.send('id: ' + request.params.id);
});

var users = 0;

io.on('connection', function(socket){
    
    //send number of connections
    users += 1;
    io.sockets.emit('num_clients',{number:users});
    
    //message for new clients
    socket.broadcast.emit('broadcast',{nickname:"system", data:'clients connected!'});
    
    
    //on new message
    socket.on('new_message',function(data){
        io.sockets.emit('broadcast', data);
    });
    
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function(){
        users -= 1;
        io.sockets.emit('num_clients',{number:users});
        socket.broadcast.emit('broadcast',{nickname:"system", data:'clients disconnected!'});
    });

});


http.listen(port, function (){
  console.log('listening on *:' + port);
});

