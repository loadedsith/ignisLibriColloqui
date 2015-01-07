define(['facebook'], function(){
  FB.init({
    appId      : FB_API_KEY,
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
  });
});