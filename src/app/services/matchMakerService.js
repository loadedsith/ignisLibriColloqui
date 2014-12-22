angular.module('ignisLibriColloqui.MatchMaker',[])
  .service('MatchMakerService', ['FirebaseService', function (FirebaseService) {
    'use strict';
    var MatchMaker = this;
    
    MatchMaker.matchesRef = FirebaseService.matchesRef;
    
    console.log('Match Maker Service Reporting in, firebase matchesRef:', MatchMaker.matchesRef);
    
    MatchMaker.matchList = {};
    
    MatchMaker.populateMatchList = function (callback) {
      FirebaseService.usersRef.once('value',function (value) {
        value.forEach(function (userRef) {
          var user = userRef.val();
          for(var ii = 0; ii < user.topics.length;ii++){
            var topic = user.topics[ii];
//            console.log('user Topic', topic);
            if(MatchMaker.matchList[topic] === undefined){
              MatchMaker.matchList[topic] = [user.id];
//              console.log('creating MatchMaker.matchList[' + topic + ']: [' + user.id +']');
            }else{
              MatchMaker.matchList[topic].push(user.id);
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
      var results = {};
      for (var i = topics.length - 1; i >= 0; i--) {
        var topic = topics[i];
        //start with all the user's topics
        var matchesForTopic = MatchMaker.matchList[topic];

        //if there are any results for this topic
        if (matchesForTopic !== undefined) {
          //go through the black list
          for (var blacklisted in blacklist){
            //a flag to remove the topic if needed
            var itIsBlacklisted = false;
            
            for (var matchForTopic in matchesForTopic){
              //go through the matched topic's user ids
              if (blacklisted === matchForTopic){
                //flag this matchForTopic for removal
                console.log('blacklisted flagged for removal', blacklisted);
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