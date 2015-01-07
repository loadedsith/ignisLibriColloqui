var React = require(['react','angular'],function () {
  angular.module('ignisLibriColloqui.Directives', [])
    .directive('fastRepeat',function() {
      'use strict';
      return {
        restrict: 'E',
        scope: {
          messages: '='
        },
        link: function(scope, el) {//extraAttr: attrs
          debugger;
          var MyComponent = React.createFactory(MYLIST);
        
          scope.$watch('messages', function(newValue) {//extraAttr: oldValue
            React.render(new MyComponent({data: newValue}),el[0]);
          }, true);
        }
      };
    });
  
});

