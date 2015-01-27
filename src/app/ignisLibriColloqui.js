//loads sub modules and wraps them up into the main module//this should be used for top-level module definitions only
define([
  'angular',
  'angular-cookies',
  'angular-ui-router',
  'angular-scroll-glue',
  'controllerIndex',
  'services/serviceIndex',
  'directives/directiveIndex',
  'components/componentIndex',
  'ng-socket',
  'config'
], function(angular) {
  'use strict';

  return angular.module('ignisLibriColloqui', [
    'ui.router',
    'ngCookies',
    'luegg.directives',
    'ignisLibriColloqui.directives',
    'ignisLibriColloqui.controllers',
    'ignisLibriColloqui.services',
    'ignisLibriColloqui.components',
    'ignisLibriColloqui.config',
    'ngSocket'
  ]).config(['Config','$socketProvider', function (Config, $socketProvider) {
    var server;
    if((Config||{}).ilcServerUrl !== undefined){
      server = Config.ilcServerUrl;
    }
    $socketProvider.setUrl(server);
  }]).filter('debug', function() {
    return function(input) {
      console.log('input', input);
      if (input === '') {
        return 'empty string';
      }
      return input;
    };
  });
});
