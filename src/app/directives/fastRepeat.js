angular.module("ignisLibriColloqui.Directives", [])
  .directive("fastRepeat",function() {
    return {
      restrict: 'E',
      scope: {
        messages: '='
      },
      link: function(scope, el, attrs) {
        scope.$watch('messages', function(newValue, oldValue) {
          React.render(MYLIST({data: newValue}),el[0]);
        }, true);
      }
    }
  })
