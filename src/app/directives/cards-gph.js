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
          swipeLeft: '=',
          cardTemplate: '='
        },
        link: function(scope, el) {//extraAttr: attrs 
          var Cards = React.createFactory(CARDS);
          var maxDrag = scope.maxDrag;
          var duration = scope.duration;
          var initialPosition = scope.initialPosition;
          var cardTemplate = scope.cardTemplate;
          var swipeRight;
          var swipeLeft;

          if(typeof scope.swipeRight === 'function'){
            swipeRight = scope.swipeRight;
          }else{
            swipeRight = function (card) {
              console.log('defualt swipeRight event', card);
            };
          }

          if(typeof scope.swipeLeft === 'function'){
            swipeLeft = scope.swipeLeft;
          }else{
            swipeLeft = function (card) {
              console.log('defualt swipeLeft event', card);
            };
          }
          
          scope.$watch('cards', function(newValue) {//extraAttr: oldValue
            React.render(new Cards({
              data: newValue,
              maxDrag: maxDrag,
              duration: duration,
              initialPosition: initialPosition,
              swipeRight: swipeRight,
              swipeLeft: swipeLeft,
              cardTemplate:cardTemplate
            }), el[0]);

          }, true);
        }
      };
    });
  
});

