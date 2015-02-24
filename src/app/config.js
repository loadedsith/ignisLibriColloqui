define(['angular', 'strings'], function(angular, Strings) {
  'use strict';
  angular.module('ignisLibriColloqui.config', []).constant('Config', {
    ilcServerUrl: '//ilc-server.herokuapp.com',
    // ilcServerUrl: 'http://0.0.0.0:5000',
    ilcTestServerUrl: 'http://0.0.0.0:5001',
    baseView: 'matches',//'matches', 'profile', 'interests', or  'messages'
    cardSize: {
      height: 558,
      width: 400
    },
    interestsLimit: 10,
    devLinks: ['cardTest', 'messagesListTest', 'ilcServerTest'],
    strings: Strings
  });
});
