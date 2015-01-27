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
          newValue.localUser = scope.localUser;
          React.render(new messagesFactory({data: newValue}), el[0]);
        }, true);
      }
    };
  });
});
