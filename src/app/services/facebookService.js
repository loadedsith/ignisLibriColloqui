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

      _this.imageConfigToAttributes = function(config) {
        var modifiers = _this.getUserImageByIdModifiers;
        var imageConfig = '';
        if (config !== undefined) {
          if (config.redirect !== undefined) {
            imageConfig = imageConfig + '?redirect=' + config.redirect;
          } else {
            imageConfig = imageConfig + '?redirect=' + modifiers.redirect;
          }
          imageConfig = imageConfig + '&';

          if (config.type !== undefined) {
            imageConfig = imageConfig + 'type=' + config.type;
          } else {
            imageConfig = imageConfig + 'type=' + modifiers.type;
          }
          imageConfig = imageConfig + '&';

          if (config.height !== undefined) {
            imageConfig = imageConfig + 'height=' + config.height;
          } else {
            imageConfig = imageConfig + 'height=' + modifiers.height;
          }
          imageConfig = imageConfig + '&';

          if (config.width !== undefined) {
            imageConfig = imageConfig + 'width=' + config.width;
          } else {
            imageConfig = imageConfig + 'width=' + modifiers.width;
          }
        }else{
          imageConfig = '?redirect=' + modifiers.redirect +
                         '&type=' + modifiers.type +
                         '&height=' + modifiers.height +
                         '&width=' + modifiers.width;
        }
        return imageConfig;
      };

      _this.getUserImageById = function(id, config, callback) {
        var resource = '/' + id + '/picture';
        var imageConfig = _this.imageConfigToAttributes(config);
        _this.apiCallbackWrapper(resource + imageConfig, function(image) {
          callback(id, image);
        });
      };

      _this.getUserImage = function(config, callback) {
        var imageConfig = _this.imageConfigToAttributes(config);
        _this.apiCallbackWrapper('/me/picture' + imageConfig, callback);
      };

      _this.getUserLikes = function(deferred, paging, beforeOrAfter, limit) {
        var resource = '/me/likes';
        if (limit !== undefined) {
          resource = resource + '?limit=' + limit;
        }else{
          resource = resource + '?limit=' + 10;
        }
        if(paging !== undefined && beforeOrAfter !== undefined){
          if(beforeOrAfter === 'before'){
            resource = resource + '&before=' + paging.cursors.before
          }else if(beforeOrAfter === 'after'){
            resource = resource + '&after=' + paging.cursors.after
          }else{
            console.log('beforeOrAfter was defined, but not before or after. Derp');
          }
        }
        _this.apiCallbackWrapper(resource, function(response) {
          deferred.resolve(response);
        });
        return deferred;
      };

      _this.getUserInfo = function(callback) {
        _this.apiCallbackWrapper('/me', callback);
      };

      _this.logout = function(deferred) {
        FB.logout(function(response) {
          deferred.resolve(response);
          // $rootScope.$broadcast('UserService:FacebookLoggedOut', true);
        });
        return deferred;
      };

      _this.login = function(callback, scope) {
        if (scope === undefined) {
          scope = 'public_profile, email, user_likes';
        }
        if (typeof callback === 'function') {
          FB.login(callback, {scope: scope});
        } else {
          FB.login(function(response) {
            // $rootScope.$broadcast('UserService:FacebookLoggedIn', true);
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
