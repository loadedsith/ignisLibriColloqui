define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('ProfileController', [
    '$scope','$q', 'Config', 'MessagesService', 'FacebookService',
    function($scope, $q, Config, MessagesService, FacebookService) {
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
    $scope.roomNames = [];
    $scope.populateRoomNames = function() {
      MessagesService.populateRoomNames(undefined, $scope.user, $scope.currentTopic);
      $scope.roomNames = MessagesService.roomNames;
    };

    $scope.roomIsAlreadyBlacklisted = function(room,key) {
      if ($scope.user.profile.blacklist !== undefined) {
        for (var i = $scope.user.profile.blacklist.length - 1; i >= 0; i--) {
          if($scope.user.profile.blacklist[i].id === key){
            return true;
          }
        }
      }
      return false;
    }

    $scope.addBlacklist = function(blacklisted) {
      if ($scope.user.profile.blacklist === undefined){
        $scope.user.profile.blacklist = [];
      }
      $scope.user.profile.blacklist.push(blacklisted);
      $scope.addBlacklistPlaceholder = '';
      $scope.save();
    };

    $scope.removeBlacklist = function(index) {
      $scope.user.profile.blacklist.splice(index,1);
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

    $scope.facebookInterestsPage = 0;
    $scope.facebookInterestsLoading = false;
    $scope.suggestFacebookInterests = function(paging, beforeOrAfter) {
      var deferred = $q.defer();
      $scope.facebookInterestsLoading = true;
      FacebookService.getUserLikes(deferred, paging, beforeOrAfter, (Config.interestsLimit || 10));
      deferred.promise.then(function(results) {
        console.log('likes results', results);
        $scope.likes = results.data;
        $scope.likesPaging = results.paging;
        $scope.facebookInterestsLoading = false;
        if (results.error !== undefined) {
          console.log('results.error', results.error);
          $scope.facebookInterestsError = $scope.Strings.facebookInterestsError;
        }
      });
    };
    $scope.showInterests = function() {
      return $scope.interests;
    };

  }]);
});