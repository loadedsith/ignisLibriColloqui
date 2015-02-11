define(['directives/directiveModule', 'react/messages', 'react'], function(directives, Messages, React) {
  'use strict';
  return directives.directive('messagesGph', function() {
    return {
      restrict: 'E',
      scope: {
        messages: '=',
        localUser: '='
      },
      link: function(scope, el) {//extraAttr: attrs
        var messagesFactory = React.createFactory(Messages);
        scope.$watch('messages', function(newValue) {//extraAttr: oldValue
          React.render(new messagesFactory({data: newValue,localUser:scope.localUser}), el[0]);
        }, true);
      }
    };
  });
});
