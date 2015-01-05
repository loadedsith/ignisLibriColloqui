/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';

describe('controllers', function(){
  var scope, facebookService, firebaseService, statusService;

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

  it('have 3 services that are not undefined', inject(function($controller) {
    expect(scope.status).toBeUndefined();

    $controller('MainController', {
      $scope: scope
  	});
    

    // expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
    expect(scope.status).toBeDefined();
    expect(facebookService).toBeDefined();
    expect(firebaseService).toBeDefined();
    expect(statusService).toBeDefined();
  }));
});
