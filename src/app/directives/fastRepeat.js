define(['/app/directives/directiveModule.js', '/app/react/messages.js', 'react'], function (directives, Messages, React) {
  'use strict';
  return directives.directive('fastRepeat',function() {
      return {
        restrict: 'E',
        scope: {
          messages: '='
        },
        link: function(scope, el) {//extraAttr: attrs
          var MyComponent = React.createFactory(Messages);
          // debugger;
          scope.$watch('messages', function(newValue) {//extraAttr: oldValue
            React.render(new MyComponent({data: newValue}),el[0]);
          }, true);
        }
      };
    });
  
});

