define(['angular'], function() {
  'use strict';
  angular.module('ignisLibriColloqui.config', []).constant('Config', {
    firebaseUrl: 'https://resplendent-fire-9421.firebaseIO.com',
    ilcServerUrl: 'http://0.0.0.0:5000',
    ilcTestServerUrl: 'http://0.0.0.0:5001',
    showMatches: false,//show automatically
    showMessages: false,//show automatically
    showProfile: true,//show automatically
    // devLinks: ['cardTest', 'messagesListTest', 'ilcServerTest'],
    strings: {
      aboutMe: 'About Me',
      addInterest:'+',
      interests:'Interests',
      interestExists:'I already know you\'re interested in that, silly',
      currentRoom: 'Current Room',
      buttonLabel: {
        sendMessage: 'Send Message',
        name: 'Name',
        message: 'Message',
        messagesListTest:'Messages List Test',
        ilcServerTest:'ILC Server Test',
        cardTest:'Card Test'
      },
      email:'Email',
      errors:{
        noName:'Look bro, I\'m not saying what you have to put in this box, but you have to put something!'
      },
      facebookHandlesImagesWarning:'Facebook Handles what images are shown to the users.',
      matches: 'Matches',
      messages: 'Messages',
      name:'Name',
      noCurrentRoom: 'There are no current rooms available to you.  ' +
        'Are you sure you have any one who\'s willing to hear you prattle?',
      noRooms:'No Messages, sorry Bro.',
      rooms: 'Rooms',
      send: 'Send',
      sendMessage: 'Send Message',
      siteTitle: '🔥 📖 💬',
      profile: 'Profile',
      updateRoom: 'Update Room',
      updateUser: 'Update User',
      messageList: 'Messages List'
    }
  });
});
