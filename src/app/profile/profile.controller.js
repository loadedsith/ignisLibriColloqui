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



    $scope.addBlacklist = function(blacklisted, profile) {
      if (profile.blacklist === undefined){
        profile.blacklist = []
      }
      profile.blacklist.push(blacklisted);
      $scope.addBlacklistPlaceholder = '';
      $scope.save(profile)
    };

    $scope.removeBlacklist = function(blacklisted, blacklist) {
      var removeAtIndex = null;
      if(blacklist === undefined || blacklisted === undefined){
        return;
      }
      for (var i = blacklist.length - 1; i >= 0; i--) {
        if(blacklisted.toLowerCase() === blacklist[i].toLowerCase()){
          removeAtIndex=i;
          continue;
        }
      }
      if (removeAtIndex !== null) {
        blacklist.splice(removeAtIndex,1);
      }
    };

    $scope.checkBlacklist = function(blacklisted, blacklist) {
      if (blacklist === undefined) {
        return true;
      }
      if (blacklisted !== '') {
        for (var i = blacklist.length - 1; i >= 0; i--) {
          if(blacklisted.toLowerCase() === blacklist[i].toLowerCase()){
            return $scope.Strings.blacklistedExists;
          }
        }
        return true;
      }else{
        return false
      }
    };


    $scope.addInterest = function(interest, profile) {
      if (profile.interests === undefined){
        profile.interests = [];
      }
      profile.interests.push(interest);
      $scope.addInterestPlaceholder = '';
      $scope.save(profile)
    };

    $scope.removeInterest = function(interest, interests) {
      var removeAtIndex = null;
      if(interests === undefined || interest === undefined){
        return;
      }
      for (var i = interests.length - 1; i >= 0; i--) {
        if(interest.toLowerCase() === interests[i].toLowerCase()){
          removeAtIndex=i;
          continue;
        }
      }
      if (removeAtIndex !== null) {
        interests.splice(removeAtIndex,1);
      }
    };

    $scope.checkInterest = function(interest, interests) {
      if (interests === undefined) {
        return true;
      }
      if (interest !== '') {
        for (var i = interests.length - 1; i >= 0; i--) {
          if(interest.toLowerCase() === interests[i].toLowerCase()){
            return $scope.Strings.interestExists;
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