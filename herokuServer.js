var originalConsole = console;

var port =  process.env.PORT || 5000;
var restify = require('restify');

var server = restify.createServer({
  port:port,
  name: 'ilcServer'
});


server.get(/.*/, restify.serveStatic({
  'directory': __dirname + '/dist',
  'default': './index.html',
  'maxAge': 0
}));


server.listen(port, function() {
  console.log('restify server listening at %s', server.url);
});
