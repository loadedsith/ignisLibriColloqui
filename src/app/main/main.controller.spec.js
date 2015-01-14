/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
define(['ignisLibriColloqui', 'controllerModule', 'angular-mocks'], function() {
  'use strict';

  describe('Main Controller Spec', function() {
    var scope;
    var facebookService;
    var firebaseService;
    var statusService;
    var config;

    beforeEach(module('ignisLibriColloqui'));

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    beforeEach(inject(function(FacebookService) {
      facebookService = FacebookService;
    }));
    beforeEach(inject(function(FirebaseService) {
      firebaseService = FirebaseService;
    }));
    beforeEach(inject(function(StatusService) {
      statusService = StatusService;
    }));
    beforeEach(inject(function(Config) {
      config = Config;
    }));

    it('have 4 services that are not undefined', inject(function($controller) {
      expect(scope.status).toBeUndefined();

      $controller('MainController', {
        $scope: scope
      });

      // expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
      expect(scope.status).toBeDefined();
      expect(config).toBeDefined();
      expect(facebookService).toBeDefined();
      expect(firebaseService).toBeDefined();
      expect(statusService).toBeDefined();
    }));
    it(' should links defined in the config.strings object', inject(function() {
      expect(config.strings).toBeDefined();
    }));
  });

});
