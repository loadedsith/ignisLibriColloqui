/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
define(['ignisLibriColloqui', 'controllerModule', 'angular-mocks'], function() {
  'use strict';

  describe('Main Controller Spec', function() {
    var scope;
    var facebookService;
    var statusService;
    var config;

    beforeEach(module('ignisLibriColloqui'));

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    beforeEach(inject(function(FacebookService) {
      facebookService = FacebookService;
    }));
    beforeEach(inject(function(StatusService) {
      statusService = StatusService;
    }));
    beforeEach(inject(function(Config) {
      config = Config;
    }));

    it('have 4 services that are not undefined', inject(function($controller) {
      $controller('MainController', {
        $scope: scope
      });
      expect(scope.status).toBeUndefined();
      expect(config).toBeDefined();
      expect(facebookService).toBeDefined();
      expect(statusService).toBeDefined();
    }));
    it('should have access to the strings object', inject(function($controller) {
      $controller('MainController', {
        $scope: scope
      });
      expect(scope.Strings).toBeDefined();
    }));
  });

});
