//Facebook's vendor codes are located below
angular.module('ignisLibriColloqui.Facebook',[])
  .service('FacebookService', function () {
    'use strict';
    var facebookService = this;
 
    facebookService.checkLoginState = function(callback) {
      console.log('facebookService.checkLoginState');
      if (typeof FB === 'undefined') {
        console.log('Facebook was not properly initialized');
        
      }else{
        if(typeof callback === 'function'){
          FB.getLoginStatus(callback);
        }else{
          FB.getLoginStatus(facebookService.statusChangeCallback);
        }
        
      }
    };
    
    facebookService.apiCallbackWrapper = function (apiResource, callback) {
      if(typeof callback === 'function'){
        FB.api(apiResource, callback);
      }else{
        FB.api(apiResource, function(response) {
          console.log('Stock api ' + apiResource + ': ', response);
        });
      }
      
    };
    
    facebookService.getUserImage = function (callback) {
      console.log('FacebookService.getUserImage');
      facebookService.apiCallbackWrapper('/me/picture', callback)
    };
    
    facebookService.getUserInfo = function (callback) {
      console.log('FacebookService.getUserInfo');
      facebookService.apiCallbackWrapper('/me', callback);
      
    };
    
    facebookService.login = function (callback, scope) {
      if (scope === undefined) {
        scope = 'public_profile,email';
      }
      console.log('facebookService.login');
      if (typeof callback === 'function') {
        FB.login(callback,{scope: scope});
        
      }else{
        FB.login(function (response) {
                    console.log('facebookService.login response', response );
          if (response.status === 'connected') {
             // Logged into your app and Facebook.
            console.log('facebookService.login Connected');
           } else if (response.status === 'not_authorized') {
             // The person is logged into Facebook, but not your app.
            console.log('facebookService.login Not Auth');
           } else {
            console.log('facebookService.login other');
             // The person is not logged into Facebook, so we're not sure if
             // they are logged into this app or not.
           }
        },{scope: scope});
      }
    };
    
    
    facebookService.statusChangeCallback = function(response) {
       console.log('facebookService.statusChangeCallback');
       console.log(response);
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
  
    return facebookService;
  });
  
window.fbAsyncInit = function() {
  'use strict';
  FB.init({
    appId      : FB_API_KEY,
    xfbml      : true,
    version    : 'v2.1'
  });
};

/*jshint ignore:start */
(function (d, s, id) {
  'use strict';
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
/*jshint ignore:end */

