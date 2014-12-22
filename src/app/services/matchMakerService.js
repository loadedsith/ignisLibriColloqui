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
      var results = [];
      

      for (var topic in topics){
        var itIsBlacklisted = false;
        for (var blacklisted in blacklist){
          if (blacklisted === MatchMaker.matchList[topic]){
            itIsBlacklisted = true;
          }
        }
        if (itIsBlacklisted === false){
          results.push(MatchMaker.matchList[topic]);
        }
      }
      return results;
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