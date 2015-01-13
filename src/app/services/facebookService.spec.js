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
    it('should have a checkLoginState method',inject(function () {
      expect(facebookService.checkLoginState).toBeDefined();
    }));

      
    describe('check login state callback',function () {
      beforeEach(function (done) {
        facebookService.checkLoginState(done);
      });
      it(' checkLoginState should call callback function',function () {
        expect(true);
      });
    });
    
    describe('check api wrapper callback function',function () {
      var response;

      beforeEach(function (done) {
        facebookService.apiCallbackWrapper('test',function (apiResponse) {
          response = apiResponse;
          done();
        });
      });

      it(' api wrapper should call callback function',function () {
        expect(true);//just getting here means the callback worked
      });
      it(' api wrapper callback should set response',function () {
        expect(response).toBeDefined();
      });
      it(' api wrapper callback should arg response be an object',function () {
        expect(typeof response).toBe('object');
      });

    });
    describe('check api wrapper actually calls FB.api function',function () {
      var apiResource = 'test';

      beforeEach(function (done) {
        spyOn(FB,'api').and.callFake(function () {
          done()
        })
        facebookService.apiCallbackWrapper(apiResource,done);
      });

      it(' api wrapper should call the FB.api function',function () {
        expect(FB.api).toHaveBeenCalled();
      });
      
      it(' api wrapper should call the FB.api function with apiResource',function () {
        expect(FB.api).toHaveBeenCalledWith(apiResource,jasmine.any(Function));
      });

    });
    describe('check login actually calls FB.login function',function () {
      var fbScope = 'public_profile,email,test';

      beforeEach(function (done) {
        spyOn(FB,'login').and.callFake(function () {
          done()
        })
        facebookService.login(done, fbScope);
      });

      it(' api wrapper should call the FB.api function',function () {
        expect(FB.login).toHaveBeenCalled();
      });
      
      it(' api wrapper should call the FB.api function with apiResource',function () {
        expect(FB.login).toHaveBeenCalledWith(jasmine.any(Function), {scope:fbScope});
      });

    });
  });
});