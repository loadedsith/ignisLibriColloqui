define(['services/serviceModule', 'angular', 'firebase'], function(services, angular, Firebase) {
  'use strict';
  return services.service('UserManagementService', ['MatchMakerService', 'FirebaseService',
    function(MatchMakerService, FirebaseService) {
      var _this = this;

      _this.createUser = function(user) {
        if (user === undefined) {
          console.log('user is undefined');
          return;
        }
        var sanitizedUser = {
          name: user['first_name'] + ' ' + user['last_name'], // jshint ignore:line
          email: user.email,
          id: String(user.id),
          blacklist: [-1, 0],
          topics: [0, 1]
        };

        FirebaseService.usersRef.push(sanitizedUser);

      };

      _this.getMatches = function(userId, blacklist, topics, callback) {
        return MatchMakerService.createMatchList(blacklist, topics,
           function(response) {
            console.log('getMatches success', response);
            callback(response);
          }
        );
      };

      _this.getBlacklist = function(userId, callback) {
        FirebaseService.usersRef.orderByChild('id').equalTo(userId).once('value', function(value) {
          if (typeof callback === 'function') {
            var numChildren = value.numChildren();
            if (numChildren === 0) {
              console.log('There were no users with the user id: ', userId);
            }
            if (numChildren > 1) {
              console.log('There were multiple users with the same user id: ', userId);
            }
            value.forEach(function(a) {
              callback(a.val().blacklist);
            });
          }
        });
        //Something like this should work for live matching
        // FirebaseService.usersRef.orderByChild('id').equalTo(userId).once('on', function(value) {
        //   if (typeof callback === 'function') {
        //     value.forEach(function(a) {
        //       var blacklist = a.val().blacklist;
        //       console.log('got blacklist:', blacklist);
        //       callback(blacklist);
        //     });
        //   }
        // });
      };

      _this.userExists = function(user, success, failure) {
        FirebaseService.usersRef.orderByChild('id').equalTo(user.id).once('value', function(value) {
          if (value.val() === null) {
            console.log('user doesnt exist, creating');
            _this.createUser(user);
            if (typeof failure === 'function') {
              failure(user);
            }
          } else {
            console.log('user exists');
            if (typeof success === 'function') {
              success(value.val());
            }
          }
        });
      };
      return _this;
    }]);
});
