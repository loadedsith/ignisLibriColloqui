window.fbAsyncInit = function() {
  FB.init({
    appId      : FB_API_KEY,
    xfbml      : true,
    version    : 'v2.1'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


angular.module("ignisLibriColloqui.Facebook",[])
  .service('FacebookService',function () {
    var facebookService = this;
 
    facebookService.checkLoginState = function() {
       console.log('facebookService.checkLoginState');
      if (typeof FB === 'undefined') {
        console.log('Facebook was not properly initialized');
        
      }else{
        FB.getLoginStatus(function(response) {
          facebookService.statusChangeCallback(response);
        });
      }
    }
    
    facebookService.login = function () {
      FB.login(function (response) {
        if (response.status === 'connected') {
           // Logged into your app and Facebook.
         } else if (response.status === 'not_authorized') {
           // The person is logged into Facebook, but not your app.
         } else {
           // The person is not logged into Facebook, so we're not sure if
           // they are logged into this app or not.
         }
      },{scope: 'public_profile,email'})
    }
    
    
    facebookService.statusChangeCallback = function(response) {
       console.log('facebookService.statusChangeCallback');
       console.log(response);
       // The response object is returned with a status field that lets the
       // app know the current login status of the person.
       // Full docs on the response object can be found in the documentation
       // for FB.getLoginStatus().
       if (response.status === 'connected') {
         // Logged into your app and Facebook.
         testAPI();
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
     }
  
    return facebookService;
  });