define(['angular'], function() {
  'use strict';
  angular.module('ignisLibriColloqui.config', []).constant('Config', {
    firebaseUrl: 'https://resplendent-fire-9421.firebaseIO.com',
    showMatches: false,//show automatically
    showMessages: true,//show automatically
    devLinks: ['cardTest','messagesListTest'],
    strings: {
      siteTitle: '🔥 📖 💬',
      currentRoom: 'Current Room',
      buttonLabel: {
        sendMessage: 'Send Message',
        name: 'Name',
        message: 'Message',
        messagesListTest:'Messages List Test',
        cardTest:'Card Test'
      },
      matches: 'Matches',
      messages: 'Messages',
      noCurrentRoom: 'There are no current rooms available to you.  ' + 'Are you sure you have any one who\'s willing to hear you prattle?',
      noRooms:'No Messages, sorry Bro.',
      rooms: 'Rooms',
      send: 'Send',
      sendMessage: 'Send Message',
      updateRoom: 'Update Room',
      updateUser: 'Update User',
      messageList: 'Messages List',

    }
  });
});
