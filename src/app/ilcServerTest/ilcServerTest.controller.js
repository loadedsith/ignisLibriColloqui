define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('ILCServerTestController', [
    '$scope', 'Config', 'ILCServerService','$socket',
    function($scope, Config, ILCServer, $socket) {
      console.log('ILC Server Test Controller, reporting in.');
      $scope.Strings = Config.strings;
      $socket.on('pong', function (data) {
        console.log('pong', data);
      });
      $scope.ping = function() {
        var data = {"test key":"test value"};
        console.log('ping', data);
        $socket.emit('ping', data);
      }
    }]);
});
