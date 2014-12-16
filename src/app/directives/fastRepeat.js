angular.module("ignisLibriColloqui.Directives", [])
  .directive("fastRepeat",function() {
    return {
      restrict: 'E',
      scope: {
        messages: '='
      },
      link: function(scope, el, attrs) {
        var MyComponent = React.createFactory(MYLIST);
        
        scope.$watch('messages', function(newValue, oldValue) {
          React.render(MyComponent({data: newValue}),el[0]);
        }, true);
      }
    }
  })
