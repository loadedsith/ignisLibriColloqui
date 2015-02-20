define(['directives/directiveModule', 'react/messages', 'react'], function(directives, Messages, React) {
  'use strict';
  return directives.directive('messagesGph', function() {
    return {
      restrict: 'E',
      scope: {
        messages: '=',
        localUser: '=',
        closeRoom: '=',
        room: '=',
        profile: '='

      },
      link: function(scope, el) {//extraAttr: attrs
        var messagesFactory = React.createFactory(Messages);
        scope.$watch('messages', function(newValue) {//extraAttr: oldValue
          React.render(new messagesFactory({
            data: newValue,
            localUser:scope.localUser,
            profile:scope.profile,
            room:scope.room,
            closeRoom:scope.closeRoom
          }), el[0]);
        }, true);
        scope.$watch('profile', function(newValue) {//extraAttr: oldValue
          React.render(new messagesFactory({
            data: scope.messages,
            localUser:scope.localUser,
            profile:newValue,
            room:scope.room,
            closeRoom:scope.closeRoom
          }), el[0]);
        }, true);
      }
    };
  });
});
