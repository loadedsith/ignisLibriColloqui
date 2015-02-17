define(['directives/directiveModule', 'react', 'react/card'], function(directives, React, Card) {
  'use strict';
  return directives.directive('cardGph', function() {
    return {
      restrict: 'E',
      scope: {
        maxDrag: '=',
        initialPosition: '=',
        duration: '=',
        card: '=',
        profile: '=',
        swipeRight: '=',
        swipeLeft: '=',
        cardTemplate:'='
      },
      link: function(scope, el) {//extraAttr: attrs
        var CardFactory = React.createFactory(Card);
        var maxDrag = scope.maxDrag;
        var duration = scope.duration;
        var initialPosition = scope.initialPosition;
        var cardTemplate = scope.cardTemplate;//React Template!
        var profile = scope.profile;
        var swipeRight;
        var swipeLeft;

        if (typeof scope.swipeRight === 'function') {
          swipeRight = scope.swipeRight;
        } else {
          swipeRight = function(card) {
            console.log('default swipeRight event', card);
          };
        }

        if (typeof scope.swipeLeft === 'function') {
          swipeLeft = scope.swipeLeft;
        } else {
          swipeLeft = function(card) {
            console.log('default swipeLeft event', card);
          };
        }

        var config = {
          maxDrag:maxDrag,
          duration:duration,
          initialPosition:initialPosition,
          swipeLeft:swipeLeft,
          swipeRight:swipeRight,
          profile:profile,
          cardTemplate:cardTemplate
        };

        scope.$watch('card', function(newValue) {//extraAttr: oldValue
          React.render(new CardFactory({
            data: newValue,
            config:config,
            children:el
          }), el[0]);
        }, true);
        scope.$watch('profile', function(newValue) {//extraAttr: oldValue
          config.profile = profile;

          React.render(new CardFactory({
            data: scope.card,
            config:config,
            children:el
          }), el[0]);
        }, true);

      }
    };
  });
});
