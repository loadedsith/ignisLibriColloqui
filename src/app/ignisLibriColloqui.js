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
  'angular-xeditable',
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
    'xeditable',
    'ngSocket'
  ]).config(['Config','$socketProvider', function (Config, $socketProvider) {
    var server;
    if((Config||{}).ilcServerUrl !== undefined){
      server = Config.ilcServerUrl;
    }
    $socketProvider.setUrl(server);
  }]).filter('debug', function() {
    return function(input) {
      if (input === '') {
        return 'empty string';
      }
      return input;
    };
  }).run(function(editableOptions) {
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });
});
