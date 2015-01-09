define(['directiveModule', '/app/react/cards.js', 'react'], function (directives, CARDS, React) {
  'use strict';
  return directives.directive('cardsGph',function() {
      return {
        restrict: 'A',
        scope: {
          cards: '='
        },
        link: function(scope, el) {//extraAttr: attrs
          var MyComponent = React.createFactory(CARDS);
          debugger;
          scope.$watch('cards', function(newValue) {//extraAttr: oldValue
            React.render(new MyComponent({data: newValue}),el[0]);
          }, true);
        }
      };
    });
  
});

