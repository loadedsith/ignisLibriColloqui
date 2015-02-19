define(['angular'], function() {
  'use strict';
  angular.module('ignisLibriColloqui.config', []).constant('Config', {
    ilcServerUrl: 'http://0.0.0.0:5000',
    ilcTestServerUrl: 'http://0.0.0.0:5001',
    showMatches: false, //show automatically
    showMessages: false, //show automatically
    showProfile: false, //show automatically
    showInterests: true, //show automatically
    baseView: 'interests',
    cardSize: {
      height: 558,
      width: 400
    },
    interestsLimit: 10,
    // devLinks: ['cardTest', 'messagesListTest', 'ilcServerTest'],
    strings: {
      aboutMe: 'About Me',
      addBlacklist: '+',
      addInterest: '+',
      allLikesAreAlreadyAdded: 'Wunderbar! All Likes are already added.',
      blacklist: 'Blacklist',
      blacklistedExists: 'I already grok you aren\'t interested in receiving messages from them.',
      buttonLabel: {
        sendMessage: 'Send Message',
        name: 'Name',
        message: 'Message',
        messagesListTest: 'Messages List Test',
        ilcServerTest: 'ILC Server Test',
        cardTest: 'Card Test'
      },
      chattingWith: 'with',
      checkmarkTip:'Use the Checkmark button to select your current interests.',
      connectedToFacebook: 'Connected To Facebook.',
      currentInterest: 'Current Interest',
      currentInterests: 'Current Interests',
      currentRoom: 'Current Room',
      email: 'Email',
      errors: {
        noName: 'Look bro, I\'m not saying what you have to put in this box, but you have to put something!'
      },
      facebookHandlesImagesWarning: 'Facebook Handles what images are shown to the users.',
      facebookInterestsError: 'Facebook likes failed. Please ensure you\'ve authorized the app to have access to this' +
        ' data (or don\'t use this feature).',
      interestExists: 'I already know you\'re interested in that, silly',
      interests: 'Interests',
      matches: 'Matches',
      messageList: 'Messages List',
      messages: 'Messages',
      name: 'Name',
      noCurrentRoom: 'There are no current rooms available to you.  ' +
        'Are you sure you have any one who\'s willing to hear you prattle?',
      noMatches: 'No matches, check back later...',
      noRooms: 'No Messages, sorry Bro.',
      profile: 'Profile',
      rooms: 'Rooms',
      send: 'Send',
      sendMessage: 'Send Message',
      siteTitle: '🔥 📖 💬',
      suggestFacebookInterests: 'Suggest Facebook Interests?',
      suggestionsFromFacebook: 'Suggestions from ',
      updateRoom: 'Update Room',
      updateUser: 'Update User',
      welcomeTo: 'Welcome to',
      whatAreYouInterestedInChattingAbout:"What are you interested in chatting about?"

    }
  });
});
