define(['angular'], function() {
  'use strict';
  angular.module('ignisLibriColloqui.config', []).constant('Config', {
    ilcServerUrl: 'http://0.0.0.0:5000',
    ilcTestServerUrl: 'http://0.0.0.0:5001',
    showMatches: true,//show automatically
    showMessages: false,//show automatically
    showProfile: false,//show automatically
    defaultView: 'matches',
    cardSize:{
      height:558,
      width:400
    },
    // devLinks: ['cardTest', 'messagesListTest', 'ilcServerTest'],
    strings: {
      aboutMe: 'About Me',
      addInterest:'+',
      addBlacklist:'+',
      interests:'Interests',
      interestExists:'I already know you\'re interested in that, silly',
      currentRoom: 'Current Room',
      blacklist:'Blacklist',
      blacklistedExists:'I already grok you aren\'t interested in receiving messages from them.',
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
      suggestionsFromFacebook:'Suggestions from ',
      facebookHandlesImagesWarning:'Facebook Handles what images are shown to the users.',
      facebookInterestsError:'Facebook likes failed. Please ensure you\'ve authorized the app to have access to this data (or don\'t use this feature).',
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
      suggestFacebookInterests:'Suggest Facebook Interests?',
      profile: 'Profile',
      updateRoom: 'Update Room',
      updateUser: 'Update User',
      messageList: 'Messages List',
      welcomeTo:'Welcome to'
    }
  });
});
