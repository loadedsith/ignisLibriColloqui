define(['/app/directives/directiveModule.js', '/app/react/cards.js', 'react'], function (directives, CARDS, React) {
  'use strict';
  return directives.directive('cardsGph',function() {
      return {
        restrict: 'A',
        scope: {
          cards: '=',
          maxDrag: '=',
          initialPosition: '=',
          duration: '=',
          swipeRight: '=',
          swipeLeft: '='
          
        },
        link: function(scope, el) {//extraAttr: attrs 
          var MyComponent = React.createFactory(CARDS);
          var maxDrag = scope.maxDrag;
          var duration = scope.duration;
          var initialPosition = scope.initialPosition;
          var swipeRight;
          var swipeLeft;

          if(typeof scope.swipeRight === 'function'){
            swipeRight = scope.swipeRight;
          }else{
            swipeRight = function () {console.log('defualt swipeRight event');};
          }

          if(typeof scope.swipeLeft === 'function'){
            swipeLeft = scope.swipeLeft;
          }else{
            swipeLeft = function (card) {console.log('defualt swipeLeft event');};
          }
          
          scope.$watch('cards', function(newValue) {//extraAttr: oldValue
            React.render(new MyComponent({
              data: newValue,
              maxDrag: maxDrag,
              duration: duration,
              initialPosition: initialPosition,
              swipeRight: swipeRight,
              swipeLeft: swipeLeft
            }), el[0]);

          }, true);
        }
      };
    });
  
});

