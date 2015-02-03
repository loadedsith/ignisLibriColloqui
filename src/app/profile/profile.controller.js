define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('ProfileController', ['$scope', 'Config', function($scope, Config) {
    $scope.Strings = Config.strings;
    console.log('$scope.Strings.errors.noName', $scope.Strings.errors.noName);
    
    $scope.checkName = function(data) {
      if (data===undefined||data===''||data.length===0){
        return $scope.Strings.errors.noName;
      }
    };
    
    $scope.save = function(profile) {
      debugger;
      $scope.$emit('ProfileController:UpdateUserProfile',profile);
    };
    
    $scope.addInterest = function(interest, profile) {
      if (profile.interests === undefined){
        profile.interests = []
      }
      profile.interests.push(interest);
      $scope.addInterestPlaceholder = '';
      $scope.save(profile)
    };
    
    $scope.interests = ['cats','frogs','baboon'];
    
    $scope.removeInterest = function(interest) {
      var removeAtIndex = null;
      for (var i = $scope.interests.length - 1; i >= 0; i--) {
        if(interest.toLowerCase() === $scope.interests[i].toLowerCase()){
          continue;
        }
      }
      $scope.interests.splice(removeAtIndex,1);
    };
    
    $scope.checkInterest = function(interest) {
      if(interest !== undefined && interest !== ''){
        for (var i = $scope.interests.length - 1; i >= 0; i--) {
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