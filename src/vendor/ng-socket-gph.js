/*
 * ngSocket.js-gph
 * https://github.com/loadedsith/ng-socket
 *
 * Copyright (c) 2013 Christopher EnyTC, David Prothero
 * Minor modifications by Graham P Heath
 * Licensed under the MIT license.
 */

// Module Copyright (c) 2013 Michael Benford

// Module for provide Socket.io support

(function() {
  'use strict';

  angular.module('ngSocket', [])
    .provider('$socket', socketProvider);

  function socketProvider() {
    var url, config;

    this.setUrl = setUrl;
    this.getUrl = getUrl;
    this.setConfig = setConfig;
    this.getConfig = getConfig;
    this.$get = ['$rootScope', '$timeout', socketFactory];

    function setConfig(value) {
      config = value;
    }

    function getConfig() {
      return config;
    }
    function setUrl(value) {
      url = value;
    }

    function getUrl() {
      return url;
    }

    function socketFactory($rootScope, $timeout) {
      var socket;

      function initializeSocket() {
        //Check if socket is undefined
        if (typeof socket === 'undefined') {
          if (typeof url !== 'undefined') {
            socket = io.connect(url, (config || {}));
          } else {
            console.log('no url to connect to');
            socket = io.connect();
          }
        }
      }

      function reconnect() {
        //Check if socket is undefined
        if (url !== 'undefined') {
          socket = io.connect(url, (config || {}));
        } else {
          console.log('no url to connect to');
          socket = io.connect();
        }
      }

      function angularCallback(callback) {
        return function() {
          if (callback) {
            var args = arguments;
            $timeout(function() {
              callback.apply(socket, args);
            }, 0);
          }
        };
      }

      function addListener(name, scope, callback) {
        initializeSocket();
        if (arguments.length === 2) {
          scope = null;
          callback = arguments[1];
        }

        socket.on(name, angularCallback(callback));

        if (scope !== null) {
          scope.$on('$destroy', function() {
            removeListener(name, callback);
          });
        }
      }

      function addListenerOnce(name, callback) {
        initializeSocket();
        socket.once(name, angularCallback(callback));
      }

      function removeListener(name, callback) {
        initializeSocket();
        socket.removeListener(name, angularCallback(callback));
      }

      function removeAllListeners(name) {
        initializeSocket();
        socket.removeAllListeners(name);
      }

      function emit(name, data, callback) {
        initializeSocket();
        socket.emit(name, data, angularCallback(callback));
      }

      var service = {
        addListener: addListener,
        on: addListener,
        once: addListenerOnce,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners,
        socket:function() {return socket},
        emit: emit
      };

      return service;
    }
  }

})();
