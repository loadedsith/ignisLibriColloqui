/*
 * ngSocket.js
 * https://github.com/chrisenytc/ng-socket
 *
 * Copyright (c) 2013 Christopher EnyTC, David Prothero
 * Licensed under the MIT license.
 */

// Module Copyright (c) 2013 Michael Benford

// Module for provide Socket.io support

(function () {
  'use strict';

  angular.module('ngSocket', [])
    .provider('$socket', function() {
      var url, config;

      this.setUrl = setUrl;
      this.getUrl = getUrl;
      this.setConfig = setConfig;
      this.getConfig = getConfig;
      this.$get = ['$rootScope', socketFactory];

      function setConfig(value) {
        config = value;
      };

      function getConfig() {
        return config;
      };

      function setUrl(value) {
        url = value;
      };

      function getUrl() {
        return url;
      };

      function socketFactory($rootScope) {
        var _this = this;

        _this.initializeSocket = function() {
          //Check if socket is undefined
          if (typeof _this.socket === 'undefined') {
            if (url !== 'undefined') {
              _this.socket = io.connect(url, (config || {}));
            } else {
              console.log('no url to connect to');
              _this.socket = io.connect();
            }
          }
        };

        _this.angularCallback =  function(callback){
          return function () {
            if (callback) {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(_this.socket, args);
              });
            }
          };
        };

        _this.addListener =  function(name, scope, callback){
          _this.initializeSocket();
          if (arguments.length === 2) {
            scope = null;
            callback = arguments[1];
          }

          _this.socket.on(name, _this.angularCallback(callback));

          if (scope !== null) {
            scope.$on('$destroy', function () {
              _this.removeListener(name, callback);
            });
          }
        };

        _this.addListenerOnce = function(name, callback){
          _this.initializeSocket();
          _this.socket.once(name, _this.angularCallback(callback));
        };

        _this.removeListener = function(name, callback){
          _this.initializeSocket();
          _this.socket.removeListener(name, _this.angularCallback(callback));
        };

        _this.removeAllListeners = function(name){
          _this.initializeSocket();
          _this.socket.removeAllListeners(name);
        };

        _this.emit =  function(name, data, callback){
          _this.initializeSocket();
          _this.socket.emit(name, data, _this.angularCallback(callback));
        };

        _this.on =  _this.addListener;
        _this.once = _this.addListenerOnce;

        return _this;
      }

  });

})();
