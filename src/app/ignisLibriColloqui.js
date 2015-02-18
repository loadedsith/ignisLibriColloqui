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
/*
Options:
  - `reconnection` whether to reconnect automatically (true)
  - `reconnectionDelay` how long to wait before attempting a new
      reconnection (1000)
  - `reconnectionDelayMax` maximum amount of time to wait between
      reconnections (5000). Each attempt increases the reconnection by
      the amount specified by `reconnectionDelay`.
  - `timeout` connection timeout before a `connect_error`
      and `connect_timeout` events are emitted (20000)
*/
    var config = {
      reconnection:true,//[true]
      reconnectionDelay:1000,//[1000]
      reconnectionDelayMax:5000,//[5000]
      timeout:20000//[20000]
    }
    $socketProvider.setUrl(server);
    $socketProvider.setConfig(config);

  }]).filter('debug', function() {
    return function(input) {
      if (input === '') {
        return 'empty string';
      }
      return input;
    };
  }).run(function(editableOptions, editableThemes) {
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
    // overwrite submit button template
    editableThemes['default'].submitTpl = '<button type="submit"><span class="icon-checkmark"></span></button>';
    editableThemes['default'].cancelTpl = '<button type="button" ng-click="$form.$cancel()"><span class="icon-blocked"></span></button>';

  });
});
