define(['angular'],function () {
  'use strict';
  angular.module('ignisLibriColloqui.config',[]).constant('Config',{
    firebaseUrl:'https://resplendent-fire-9421.firebaseIO.com',
    strings:{
      siteTitle:'🔥 📖 💬',
      links:[
        {name:'Home',route:'home'},
        {name:'Card Test',route:'cardTest'},
        {name:'Messages Test',route:'messagesTest'},
        {name:'Messages List Test',route:'messagesListTest'}
      ],
      buttonLabel:{
        sendMessage: 'Send Message',
        name:'Name',
        message:'Message'
      },
      messageList:'Messages List',
      messages: 'Messages',
      rooms: 'Rooms',
      currentRoom: 'Current Room',
      updateRoom: 'Update Room',
      updateUser: 'Update User',
      sendMessage: 'Send Message'
    }
  });
});