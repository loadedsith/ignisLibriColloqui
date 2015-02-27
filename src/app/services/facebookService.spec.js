define(['services/serviceModule', 'angular-mocks'], function() {
  'use strict';
  describe('facebook services', function() {
    var facebookService;

    var defaultImageProperties = {
      redirect: false,
      height: 320,
      width: 160,
      type: 'normal'
    };

    beforeEach(module('ignisLibriColloqui.services'));

    beforeEach(inject(function(FacebookService) {
      facebookService = FacebookService;
    }));

    it('should have an FB and service references', inject(function() {
      expect(FB).toBeDefined();
      expect(facebookService).toBeDefined();
    }));
    it('should have a checkLoginState method', inject(function() {
      expect(facebookService.checkLoginState).toBeDefined();
    }));

    // describe('check login state callback', function() {
    //   beforeEach(function(done) {
    //     facebookService.checkLoginState(done);
    //   });
    //   it('checkLoginState should call callback function', function() {
    //     expect(true);
    //   });
    // });

    // TODO: Test now fails because the response is returned as a deffered promise, not in a callback
    // describe('check api wrapper callback function', function() {
    //   var response;
    //
    //   beforeEach(function(done) {
    //     facebookService.apiCallbackWrapper('test', function(apiResponse) {
    //       response = apiResponse;
    //       done();
    //     });
    //   });
    //   it('api wrapper should call callback function', function() {
    //     expect(true);//just getting here means the callback worked
    //   });
    //   it('api wrapper callback should set response', function() {
    //     expect(response).toBeDefined();
    //   });
    //   it('api wrapper callback should arg response be an object', function() {
    //     expect(typeof response).toBe('object');
    //   });
    // });

    describe('check api wrapper actually calls FB.api function', function() {
      var apiResource = 'test';

      beforeEach(function(done) {
        spyOn(FB, 'api').and.callFake(function() {
          done();
        });
        facebookService.apiCallbackWrapper(apiResource, done);
      });

      it('api wrapper should call the FB.api function', function() {
        expect(FB.api).toHaveBeenCalled();
      });

      it('api wrapper should call the FB.api function with apiResource', function() {
        expect(FB.api).toHaveBeenCalledWith(apiResource, jasmine.any(Function));
      });

    });

    describe('check login actually calls FB.login function', function() {
      var fbScope = 'public_profile, email, test';

      beforeEach(function(done) {
        spyOn(FB, 'login').and.callFake(function() {
          done();
        });
        facebookService.login(done, fbScope);
      });

      it('api wrapper should call the FB.api function', function() {
        expect(FB.login).toHaveBeenCalled();
      });

      it('api wrapper should call the FB.api function with apiResource', function() {
        expect(FB.login).toHaveBeenCalledWith(jasmine.any(Function), {scope:fbScope});
      });
    });

    describe('getUserImageById calls the callback', function() {
      beforeEach(function(done) {
        facebookService.getUserImageById('1000', defaultImageProperties, done);
      });
      it('getUserImageById should call callback function', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
    });

    describe('getUserImageById calls the callback with values', function() {
      var userId = '1001';
      beforeEach(function(done) {
        spyOn(facebookService, 'apiCallbackWrapper').and.callFake(function() {
          done();
        });
        facebookService.getUserImageById(userId, defaultImageProperties, done);
      });

      it('api wrapper should call the FB.api function', function() {
        expect(facebookService.apiCallbackWrapper).toHaveBeenCalled();
      });

      it('api wrapper should call the FB.api function with apiResource', function() {
        var expectedResource = '/' + userId + '/picture';
        var expectedResourceParams = '?redirect=' + defaultImageProperties.redirect;
        expectedResourceParams += '&type=' + defaultImageProperties.type;
        expectedResourceParams += '&height=' + defaultImageProperties.height;
        expectedResourceParams += '&width=' + defaultImageProperties.width;
        expectedResource += expectedResourceParams;
        expect(facebookService.apiCallbackWrapper)
          .toHaveBeenCalledWith(expectedResource, jasmine.any(Function));
      });
    });

    describe('getUserImage calls the callback', function() {
      beforeEach(function(done) {
        facebookService.getUserImage(done);
      });
      it('getUserImage should call callback function', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
    });

    describe('getUserImage calls the callback with values', function() {
      beforeEach(function(done) {
        spyOn(facebookService, 'apiCallbackWrapper').and.callFake(function() {
          done();
        });
        facebookService.getUserImage(done);
      });

      it('api wrapper should call the FB.api function', function() {
        expect(facebookService.apiCallbackWrapper).toHaveBeenCalled();
      });

      it('api wrapper should call the FB.api function with apiResource', function() {
        expect(facebookService.apiCallbackWrapper)
          .toHaveBeenCalledWith('/me/picture', jasmine.any(Function));
      });
    });
    describe('getUserInfo calls the callback', function() {
      beforeEach(function(done) {
        facebookService.getUserInfo(done);
      });
      it('getUserInfo should call callback function', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
    });

    describe('getUserInfo calls the callback with values', function() {
      beforeEach(function(done) {
        spyOn(facebookService, 'apiCallbackWrapper').and.callFake(function() {
          done();
        });
        facebookService.getUserInfo(done);
      });

      it('api wrapper should call the FB.api function', function() {
        expect(facebookService.apiCallbackWrapper).toHaveBeenCalled();
      });

      it('api wrapper should call the FB.api function with apiResource', function() {
        expect(facebookService.apiCallbackWrapper)
          .toHaveBeenCalledWith('/me', jasmine.any(Function));
      });
    });
  });
});
