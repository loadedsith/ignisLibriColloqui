//loads sub modules and wraps them up into the main module//this should be used for top-level module definitions only
define([
  'angular',
  'angular-cookies',
  'angular-ui-router',
  'controllerIndex',
  'services/serviceIndex',
  'directives/directiveIndex',
  'components/componentIndex',
  'config'
], function(angular) {
  'use strict';

  return angular.module('ignisLibriColloqui', [
    'ui.router',
    'ngCookies',
    'ignisLibriColloqui.directives',
    'ignisLibriColloqui.controllers',
    'ignisLibriColloqui.services',
    'ignisLibriColloqui.components',
    'ignisLibriColloqui.config'
  ]).filter('debug', function() {
    return function(input) {
      console.log('input',input);
      if (input === '') {
        return 'empty string';
      }
      return input ? input : ('' + input);
    };
  });
});
