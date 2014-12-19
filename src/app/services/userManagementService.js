angular.module('ignisLibriColloqui.UserManagement',[])
  .service('UserManagementService', ['FirebaseService', function (FirebaseService) {
    'use strict';
    var UserManagement = this;
    
    UserManagement.createUser = function (user) {
      if(user===undefined){
        console.log('user is undefined');
        return;
      }
      var sanitizedUser = {
        name: user.first_name + " " + user.last_name,
        email: user.email,
        id: user.id,
        blacklist: [-1,0]
      }
      FirebaseService.usersRef.push(sanitizedUser);
    }
    UserManagement.getMatches = function (userId, callback) {
      
    };
    UserManagement.getBlacklist = function (userId, callback) {
      FirebaseService.usersRef.orderByChild("id").equalTo(userId).once('value', function(value){
        if(typeof callback === 'function'){
          value.forEach(function(a){
            var blacklist = a.val().blacklist;
            console.log('got blacklist:', blacklist);
            callback(blacklist)
          });
        }
      });
      //Something like this should work for live matching
      // FirebaseService.usersRef.orderByChild("id").equalTo(userId).once('on', function(value){
      //   if(typeof callback === 'function'){
      //     value.forEach(function(a){
      //       var blacklist = a.val().blacklist;
      //       console.log('got blacklist:', blacklist);
      //       callback(blacklist);
      //     });
      //   }
      // });
    }
    UserManagement.userExists = function (user, success, failure) {
      FirebaseService.usersRef.orderByChild("id").equalTo(user.id).once('value', function(value){
        if(value.val() === null){
          console.log('user doesnt exist, creating');
          UserManagement.createUser(user)
          if (typeof failure === 'function'){
            failure(user);
          }
        }else{
          console.log('user exists');
          if (typeof success === 'function'){
            success(user);
          }
        }
      })
    };
        return UserManagement;
  }]);
  
  