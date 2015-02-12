'use strict';
define(['controllerModule', 'angular'], function(controllers) {
  controllers
    .controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
      $scope.fallbackImage = './assets/images/FBProfile.jpg';
      $scope.profilePicture = $scope.fallbackImage;

      $scope.checkLoginState = UserService.checkLoginState;

      $scope.userInitialized = function() {
        if ($scope.user === undefined) {
          return false;
        }
        if ($scope.user.id === undefined) {
          return false;
        }
        return true;
      };

      $scope.logoutOfFacebook = UserService.logoutOfFacebook;
      $scope.loginToFacebook = UserService.loginToFacebook;

      $scope.loggedIn = function() {
        return UserService.loggedIn;
      };

      $scope.loginStatus = function() {
        return UserService.loginStatus;
      };

      $scope.$on('UserService:Update', function(event, user) {
        $scope.user = user;

        // this annotation means if user.profilePicture.data.url exists, use that, if not use the fallback image
        var newProfilePicture = ((user.profilePicture || {}).data || {} ).url||$scope.fallbackImage;

        //TODO: this wouldnt update the image if somehow facebook changed the image, maybe it should

        //if you used the fallback image, there's no need to update
        if (newProfilePicture !== $scope.fallbackImage) {
          //it the profile picture is the fall back, use user.profilePicture.data.url or the fallback image.
          $scope.profilePicture = newProfilePicture;
        }
      })
    }]);
});
