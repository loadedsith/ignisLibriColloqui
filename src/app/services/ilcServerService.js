define(['services/serviceModule', 'angular'], function(services, angular) {
  'use strict';
  return services.service('ILCServerService', ['Config', '$socket', function(Config, $socket) {
    var _this = this;
    // console.log('socket', socket);

    if (Config.ilcServerUrl) {
      _this.ilcServerUrl = Config.ilcServerUrl;
    } else {
      console.log('Strings.ilcServerUrl was unset');
      _this.ilcServerUrl = 'http://localhost:5000';
    }
    _this.login = function(accessToken) {
      $socket.emit('login validator', accessToken);
      
    }

    return _this;
  }]);
});
