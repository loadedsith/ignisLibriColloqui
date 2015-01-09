/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-cookies',
    'angular-ui-router',
    './controllerIndex',
    './services/serviceIndex',
    './directives/directiveIndex'
], function (angular) {
    'use strict';

    return angular.module('ignisLibriColloqui', [
      'ui.router',
      'ngCookies',
      'ignisLibriColloqui.directives',
      'ignisLibriColloqui.controllers',
      'ignisLibriColloqui.services'
    ]);
});



  // 'ignisLibriColloqui.User','ignisLibriColloqui.UserManagement', 'ignisLibriColloqui.Firebase', 'ignisLibriColloqui.Status', 'ignisLibriColloqui.Directives', 'ignisLibriColloqui.MatchMaker'
  // ])
  