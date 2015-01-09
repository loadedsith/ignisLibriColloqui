define(['/app/directives/directiveModule.js', '/app/react/cards.js', 'react'], function (directives, CARDS, React) {
  'use strict';
  return directives.directive('cardsGph',function() {
      return {
        restrict: 'A',
        scope: {
          cards: '=',
          maxDrag: '='
        },
        link: function(scope, el) {//extraAttr: attrs 
          var MyComponent = React.createFactory(CARDS);
          
          var maxDrag = scope.maxDrag;
          
          scope.$watch('cards', function(newValue) {//extraAttr: oldValue
            React.render(new MyComponent({data: newValue,maxDrag:maxDrag}),el[0]);
          }, true);
        }
      };
    });
  
});

