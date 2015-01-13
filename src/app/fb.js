define(['facebook', 'env'], function(){
  'use strict';
  FB.init({
    appId      : FB_API_KEY,
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
  });
});