define(['directives/directiveModule', 'react', 'react/card'], function(directives, React, Card) {
  'use strict';
  return directives.directive('cardGph', function() {
    return {
      restrict: 'E',
      scope: {
        card: '=',
        cardTemplate:'=',
        disableDrag:'=',
        duration: '=',
        initialPosition: '=',
        maxDrag: '=',
        profile: '=',
        swipeLeft: '=',
        swipeRight: '=',
        userProfile: '='
      },
      link: function(scope, el) {//extraAttr: attrs
        var CardFactory = React.createFactory(Card);
        var cardTemplate = scope.cardTemplate;//React Template!
        var duration = scope.duration;
        var disableDrag = scope.disableDrag;
        var initialPosition = scope.initialPosition;
        var maxDrag = scope.maxDrag;
        var profile = scope.profile;
        var swipeLeft;
        var swipeRight;
        var userProfile = scope.userProfile;

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
          cardTemplate: cardTemplate,
          duration: duration,
          disableDrag: disableDrag,
          initialPosition: initialPosition,
          maxDrag: maxDrag,
          profile: profile,
          swipeLeft: swipeLeft,
          swipeRight: swipeRight,
          userProfile: userProfile
        };

        scope.$watch('card', function(newValue) {
          React.render(new CardFactory({
            data: newValue,
            config: config,
            children: el
          }), el[0]);
        }, true);

        scope.$watch('userProfile', function() {
          config.userProfile = userProfile;
          React.render(new CardFactory({
            data: scope.card,
            config: config,
            children: el
          }), el[0]);
        }, true);

        scope.$watch('profile', function() {
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
