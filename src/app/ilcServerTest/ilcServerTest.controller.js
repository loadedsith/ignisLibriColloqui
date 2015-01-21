define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('ILCServerTestController', [
    '$scope', 'Config', 'ILCServerService','$socket',
    function($scope, Config, ILCServer, $socket) {
      console.log('ILC Server Test Controller, reporting in.');
      //ensure that status calls reference the current status
      $scope.Strings = Config.strings;
      debugger;
      $socket.on('pong', function (data) {
        console.log('pong', data);
      });
      var data = {"test key":"test value"};
      $scope.ping = function() {
        console.log('ping', data);
        debugger;
        $socket.emit('ping', data);
      }
      $scope.ping();
    }]);
});
