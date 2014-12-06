angular.module("ignisLibriColloqui.Directives", [])
  .directive("fastRepeat",function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function(scope, el, attrs) {
        console.log('Purple orca2');
        scope.$watch('data', function(newValue, oldValue) {
          console.log('Purple orca3');

          React.render(MYLIST({data: newValue}),angular.element(el)[0]);
        });
      }
    }
  })
