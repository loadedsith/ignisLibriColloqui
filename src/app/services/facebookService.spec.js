/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';
define(['services/serviceModule','angular-mocks'],function (controllers) {
  describe('facebook services', function(){
    var facebookService;

    beforeEach(module('ignisLibriColloqui.services'));
  
    beforeEach(inject(function(FacebookService) {
      facebookService = FacebookService;
    }));

    it('should have an FB and service references ', inject(function() {
      expect(FB).toBeDefined();
      expect(facebookService).toBeDefined();
    }));
  });
});