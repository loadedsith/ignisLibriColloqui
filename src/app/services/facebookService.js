define(['services/serviceModule', 'facebook', 'env', 'angular'], function(services, FB) {
  //Facebook's vendor codes are located below
  'use strict';
  FB.init({
    appId      : FB_API_KEY,
  });
  return services
    .service('FacebookService', function() {
      var _this = this;

      _this.checkLoginState = function(callback) {
        console.log('facebook Service.checkLoginState');
        if (typeof FB === 'undefined') {
          console.log('Facebook was not properly initialized');
        } else {
          if (typeof callback === 'function') {
            FB.getLoginStatus(callback);
          } else {
            FB.getLoginStatus(_this.statusChangeCallback);
          }
        }
      };

      _this.apiCallbackWrapper = function(apiResource, callback) {
        if (typeof callback === 'function') {
          FB.api(apiResource, callback);
        } else {
          FB.api(apiResource, function(response) {
            console.log('Stock api ' + apiResource + ': ', response);
          });
        }
      };

      _this.getUserImageById = function(id, callback) {
        console.log('FacebookService.getUserImageById: ', id);
        _this.apiCallbackWrapper('/' + id + '/picture', function(image) {
          callback(id, image);
        });
      };

      _this.getUserImage = function(callback) {
        console.log('FacebookService.getUserImage');
        _this.apiCallbackWrapper('/me/picture', callback);
      };

      _this.getUserInfo = function(callback) {
        console.log('FacebookService.getUserInfo');
        _this.apiCallbackWrapper('/me', callback);
      };

      _this.login = function(callback, scope) {
        if (scope === undefined) {
          scope = 'public_profile, email';
        }
        console.log('facebook service.login');
        if (typeof callback === 'function') {
          FB.login(callback, {scope: scope});
        } else {
          FB.login(function(response) {
            console.log('facebookService.login response', response);
            if (response.status === 'connected') {
              // Logged into your app and Facebook.
              console.log('facebookService.login Connected');
            } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              console.log('facebookService.login Not Auth');
            } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              console.log('facebookService.login other');
            }
          }, {scope: scope});
        }
      };

      _this.statusChangeCallback = function(response) {
         console.log('facebook Service.statusChangeCallback');
         // The response object is returned with a status field that lets the
         // app know the current login status of the person.
         // Full docs on the response object can be found in the documentation
         // for FB.getLoginStatus().
         if (response.status === 'connected') {
           // Logged into your app and Facebook.
           //testAPI();
         } else if (response.status === 'not_authorized') {
           // The person is logged into Facebook, but not your app.
           document.getElementById('status').innerHTML = 'Please log ' +
             'into this app.';
         } else {
           // The person is not logged into Facebook, so we're not sure if
           // they are logged into this app or not.
           document.getElementById('status').innerHTML = 'Please log ' +
             'into Facebook.';
         }
       };
      return _this;
    });
});
