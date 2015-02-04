var httpPort = 10999;
var socketPort = 5001;

var restify = require('restify');
var socketio = require('socket.io')(socketPort);
var fs = require('fs');

var firebaseUrl;
var firebaseUrlFile = fs.readFileSync(__dirname + '/firebaseUrl').toString().split('\n');
firebaseUrl = firebaseUrlFile[0];

var server = restify.createServer({
  name: 'ilcServer Mock'
});

var io = socketio.listen(server);

server.get(/.*/, restify.serveStatic({
  'directory': __dirname,
  'default': './app/index.html',
  'maxAge': 0
}));

io.sockets.on('connection', function(socket) {
  var socketId = socket.id;
  console.log('user connected');
  socket.on('ping', function(data) {
    console.log('received ping', data);
    socket.emit('pong', data);
    console.log('sent pong', data);
  });
  socket.on('test event',function(mockEvent) {
    console.log('got event: ', mockEvent.name, mockEvent.data);
    socket.emit(mockEvent.name,mockEvent.data);
  })
});

server.listen(httpPort, function() {
  console.log('resify server listening at %s', server.url, 'socket port:', socketPort);
});
