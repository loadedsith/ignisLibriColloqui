define(['angular'],function () {
  'use strict';
  angular.module('ignisLibriColloqui.strings',[]).constant('Strings',{
    siteTitle:'🔥 📖 💬',
    links:[
      {name:'Home',route:'home'},
      {name:'Card Test',route:'cardTest'},
      {name:'Messages Test',route:'messagesTest'},
      {name:'Messages List Test',route:'messagesListTest'}
    ]
    
  });
});