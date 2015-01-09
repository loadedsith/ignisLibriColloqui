define(['serviceModule','angular','firebase'], function (services, angular, Firebase) {
  'use strict';
  return services.service('MatchMakerService', ['FirebaseService', function (FirebaseService) {
    var MatchMaker = this;
    
    MatchMaker.matchesRef = FirebaseService.matchesRef;
    
    console.log('Match Maker Service Reporting in, firebase matchesRef:', MatchMaker.matchesRef);
    
    MatchMaker.matchList = {};
    
    MatchMaker.populateMatchList = function (callback) {
      FirebaseService.usersRef.once('value',function (value) {
        value.forEach(function (userRef) {
          var user = userRef.val();
          for(var ti = 0; ti < user.topics.length; ti++){
            var topic = user.topics[ti];
//            console.log('user Topic', topic);
            if(MatchMaker.matchList[topic] === undefined){
              MatchMaker.matchList[topic] = [String(user.id)];
//              console.log('creating MatchMaker.matchList[' + topic + ']: [' + user.id +']');
            }else{
              MatchMaker.matchList[topic].push(String(user.id));
//              console.log('adding MatchMaker.matchList[' + topic + ']: [' + user.id +']');
            }
          }
          console.log('Matched matchList', MatchMaker.matchList);
        });
        if(typeof callback==='function'){
          console.log('trigger');
          callback();
        }
      });
    };
    

    MatchMaker.blacklistMatchList = function (blacklist, topics) {
      for (var ti = topics.length - 1; ti >= 0; ti--) {
        var topic = topics[ti];
        //start with all the user's topics
        var matchesForTopic = MatchMaker.matchList[topic];
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
              if (String(blacklisted) === String(matchForTopic)){
                //flag this matchForTopic for removal
                console.log('blacklisted flagged for removal', blacklisted, 'for topic: ' + topic);
                itIsBlacklisted = true;
              }
            }
            //now that we arent looping over the topics,
            // check if the current blacklist object should be removed from the matches
            if(itIsBlacklisted === true){
              // remove blacklist object from match topic
              matchesForTopic.pop(blacklisted);
            }
          }
        }
      }
      return MatchMaker.matchList;
    };
    
    MatchMaker.createMatchList = function (blacklist, topics, success) {
      //accept a blacklist an array of userids, and a callback
      if (MatchMaker.lastPopulateMatchList === undefined) {
        MatchMaker.lastPopulateMatchList = new Date().getTime();
        MatchMaker.populateMatchList(function () {
          var results = MatchMaker.blacklistMatchList(blacklist, topics);
          if(typeof success==='function'){
            success(results);
          }
        });
      }
    };
    
    return MatchMaker;
  }]);
});
