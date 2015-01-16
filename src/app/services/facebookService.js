define(['services/serviceModule', 'facebook', 'env', 'angular'], function(services, FB) {
  //Facebook's vendor codes are located below
  'use strict';
  FB.init({
    appId      : FB_API_KEY,
  });
  return services
    .service('FacebookService', function() {
      var _this = this;

      _this.getUserImageByIdModifiers = {
        redirect: false,
        height: 320,
        width: 160,
        type: 'normal'
      };

      _this.checkLoginState = function(deferred) {
        console.log('facebook Service.checkLoginState');
        if (typeof FB === 'undefined') {
          console.log('Facebook was not properly initialized');
        } else {
          FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              deferred.resolve(response);
            } else {
              deferred.reject(response);
            }
          });
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

      _this.getUserImageById = function(id, config, callback) {
        var modifiers = _this.getUserImageByIdModifiers;
        console.log('FacebookService.getUserImageById: ', id);
        var resource = '/' + id + '/picture';

        if (config !== undefined) {
          if (config.redirect !== undefined) {
            resource = resource + '?redirect=' + config.redirect;
          } else {
            resource = resource + '?redirect=' + modifiers.redirect;
          }
          resource = resource + '&';

          if (config.type !== undefined) {
            resource = resource + 'type=' + config.type;
          } else {
            resource = resource + 'type=' + modifiers.type;
          }
          resource = resource + '&';

          if (config.height !== undefined) {
            resource = resource + 'height=' + config.height;
          } else {
            resource = resource + 'height=' + modifiers.height;
          }
          resource = resource + '&';

          if (config.width !== undefined) {
            resource = resource + 'width=' + config.width;
          } else {
            resource = resource + 'width=' + modifiers.width;
          }
        }
        _this.apiCallbackWrapper(resource, function(image) {
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
      return _this;
    });
});
