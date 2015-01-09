/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-cookies',
    'angular-ui-router',
    './controllerIndex',
    './services/facebookService',
    './services/statusService',
    './services/firebaseService',
    './services/matchMakerService',
    './services/userService',
    './services/userManagementService'
    './directiveIndex'
], function (angular) {
    'use strict';
    return angular.module('ignisLibriColloqui', [
      'ui.router',
      'ngCookies',
      'ignisLibriColloqui.directives',
      'ignisLibriColloqui.controllers',
      'ignisLibriColloqui.Facebook',
      'ignisLibriColloqui.Status',
      'ignisLibriColloqui.Firebase',
      'ignisLibriColloqui.MatchMaker',
      'ignisLibriColloqui.User',
      'ignisLibriColloqui.UserManagement'
       
    ]);
});



  // 'ignisLibriColloqui.User','ignisLibriColloqui.UserManagement', 'ignisLibriColloqui.Firebase', 'ignisLibriColloqui.Status', 'ignisLibriColloqui.Directives', 'ignisLibriColloqui.MatchMaker'
  // ])
  