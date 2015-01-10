define(['/app/directives/directiveModule.js', 'react', '/app/react/card.js','/app/react/matchDisplay.js',], function (directives, React, Card, MatchDisplay) {
  'use strict';
  return directives.directive('cardGph',function() {
      return {
        restrict: 'E',
        transclude:true,
        template: '<div class=\'test\'></div><div ng-transclude></div>', // This is the template that will replace the <blink> tag. The ng-transclude indicates what element should be blended.
        scope: {
          maxDrag: '=',
          initialPosition: '=',
          duration: '=',
          card: '=',
          swipeRight: '=',
          swipeLeft: '=',
          cardTemplate:'='
        },
        link: function(scope, el) {//extraAttr: attrs 
          var MyComponent = React.createFactory(Card);
          var maxDrag = scope.maxDrag;
          var duration = scope.duration;
          var initialPosition = scope.initialPosition;
          var cardTemplate = scope.cardTemplate||MatchDisplay;
          // var cardTemplate = MatchDisplay;
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
          
          var config = {
            maxDrag:maxDrag,
            duration:duration,
            initialPosition:initialPosition,
            swipeLeft:swipeLeft,
            swipeRight:swipeRight,
            cardTemplate:cardTemplate
          };
         
          
          scope.$watch('card', function(newValue) {//extraAttr: oldValue
            React.render(new MyComponent({
              data: newValue,
              config:config,
              children:el
            }), el[0]);

          }, true);
        }
      };
    });
  
});

