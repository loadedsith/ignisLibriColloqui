define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('ProfileController', ['$scope', 'Config', function($scope, Config) {
    $scope.Strings = Config.strings;

    $scope.checkName = function(data) {
      if (data===undefined||data===''||data.length===0){
        return $scope.Strings.errors.noName;
      }
    };
    $scope.saving = false;
    $scope.$on('user profile updated',function() {
      console.log('profile saved');
      $scope.saving = false;
    });

    $scope.save = function(profile) {
      $scope.saving = true;

      //not actually required because the form has direct access to the user object
      // $scope.$emit('ProfileController:UpdateUserProfile',profile);
    };



    $scope.addInterest = function(interest, profile) {
      if (profile.interests === undefined){
        profile.interests = []
      }
      profile.interests.push(interest);
      $scope.addInterestPlaceholder = '';
      $scope.save(profile)
    };

    $scope.removeInterest = function(interest) {
      var removeAtIndex = null;
      for (var i = $scope.interests.length - 1; i >= 0; i--) {
        if(interest.toLowerCase() === $scope.interests[i].toLowerCase()){
          continue;
        }
      }
      $scope.interests.splice(removeAtIndex,1);
    };

    $scope.checkInterest = function(interest, interests) {
      if(interests === undefined){
        return true;
      }
      if(interest !== undefined && interest !== ''){
        for (var i = interests.interests.length - 1; i >= 0; i--) {
          if(interest.toLowerCase() === $scope.interests[i].toLowerCase()){
            return "That interest already Exists, silly."
          }
        }
        return true;
      }else{
        return false
      }
    };
    $scope.showInterests = function() {
      return $scope.interests;
    }
  }]);
});