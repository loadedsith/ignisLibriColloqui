define(['services/serviceModule', 'angular', 'firebase'], function(services, angular, Firebase) {
  'use strict';
  return services.service('MatchMakerService', ['FirebaseService', function(FirebaseService) {
    var _this = this;

    _this.matchesRef = FirebaseService.matchesRef;

    console.log('Match Maker Service Reporting in, firebase matchesRef:', _this.matchesRef);

    _this.matchList = {};

    _this.populateMatchList = function(callback) {
      FirebaseService.usersRef.once('value', function(value) {
        value.forEach(function(userRef) {
          var user = userRef.val();
          for (var ti = 0; ti < user.topics.length; ti++) {
            var topic = user.topics[ti];
            if (_this.matchList[topic] === undefined) {
              _this.matchList[topic] = [String(user.id)];
            } else {
              _this.matchList[topic].push(String(user.id));
            }
          }
          // console.log('Matched matchList', _this.matchList);
        });
        if (typeof callback === 'function') {
          // console.log('trigger');
          callback();
        }
      });
    };

    _this.blacklistMatchList = function(blacklist, topics) {
      for (var ti = topics.length - 1; ti >= 0; ti--) {
        var topic = topics[ti];
        //start with all the user's topics
        var matchesForTopic = _this.matchList[topic];
        //if there are any results for this topic
        if (matchesForTopic !== undefined) {
          //go through the black list
          for (var bi = blacklist.length - 1; bi >= 0; bi--) {
            var blacklisted = blacklist[bi];
            //a flag to remove the topic if needed
            var itIsBlacklisted = false;
            for (var i = matchesForTopic.length - 1; i >= 0; i--) {
              var matchForTopic = matchesForTopic[i];
              //go through the matched topic's user ids
              if (String(blacklisted) === String(matchForTopic)) {
                //flag this matchForTopic for removal
                console.log('blacklisted flagged for removal', blacklisted, 'for topic: ' + topic);
                itIsBlacklisted = true;
              }
            }
            //now that we arent looping over the topics,
            // check if the current blacklist object should be removed from the matches
            if (itIsBlacklisted === true) {
              // remove blacklist object from match topic
              matchesForTopic.pop(blacklisted);
            }
          }
        }
      }
      return _this.matchList;
    };

    _this.createMatchList = function(blacklist, topics, success) {
      //accept a blacklist an array of userids, and a callback
      if (_this.lastPopulateMatchList === undefined) {
        _this.lastPopulateMatchList = new Date().getTime();
        _this.populateMatchList(function() {
          var results = _this.blacklistMatchList(blacklist, topics);
          if (typeof success === 'function') {
            success(results);
          }
        });
      }
    };

    return _this;
  }]);
});
