/* jshint unused: false */

/* {      
       var findKeyframesRule = function(rule) {
         var ss = document.styleSheets;
         for (var i = 0; i < ss.length; ++i) {
           for (var j = 0; j < ss[i].cssRules.length; ++j) {
             if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && 
             ss[i].cssRules[j].name == rule) { 
               return ss[i].cssRules[j]; }
           }
         }
         return null;
       }
       
       function getClosest(keyframe) {
         // curr stands for current keyframe
         var curr = keyframe[0];
         var diff = Math.abs (totalCurrentPercent - curr);
         for (var val = 0, j = keyframe.length; val < j; val++) {
           var newdiff = Math.abs(totalCurrentPercent - keyframe[val]);
           // If the difference between the current percent and the iterated 
           // keyframe is smaller, take the new difference and keyframe
           if (newdiff < diff) {
             diff = newdiff;
             curr = keyframe[val];
            }
         }
         return curr;
       }
       
       var cardSlideRightRules = findKeyframesRule('cardSlideRight');
       
       var keyframeString = [];
       for (var i = 0; i < cardSlideRightRules.cssRules.length; i ++)
       {
         keyframeString.push(cardSlideRightRules[i].keyText); 
       }
  
       // Removes all the % values from the array so
       // the getClosest function can perform calculations
       var keys = keyframeString.map(function(str) {
         return str.replace('%', '');
       });
}
*/ 

define(['react', 'bezier-easing', 'react/card'], function(React, BezierEasing, CARD) {
  'use strict';
  var getCardFromChild = function(element, maxAttempts) {
    if (element.classList.contains('card')) {
      return element;
    }
    if (maxAttempts === undefined) {maxAttempts = 6;}
    var attemptsLeft = maxAttempts;
    if (!(element === undefined || element === null)) {
      if (!(element.classList === undefined || element.classList === null)) {
        while(!element.classList.contains('card') && attemptsLeft > 0) {
          element = element.parentElement;
          attemptsLeft = attemptsLeft-1;
          if (!(element === undefined || element === null)) {
            attemptsLeft = 0;
          }
        }
      }
    }
    return element;
  };
  
  var topOfTheStack = function(card) {
    if (card.nextSibling === null) {
      return true;
    }
    return false;
  };
  
   return  React.createClass({
     render: function() {
       var data = this.props.data;
       var maxDrag = this.props.maxDrag;
       var duration = this.props.duration;
       var initialPosition = this.props.initialPosition;
       var swipeRight = this.props.swipeRight;
       var swipeLeft = this.props.swipeLeft;
       var cardTemplate = this.props.cardTemplate;

       if (data !== undefined) {
         var config = {
           maxDrag:maxDrag,
           duration:duration,
           initialPosition:initialPosition,
           swipeLeft:swipeLeft,
           swipeRight:swipeRight,
           cardTemplate:cardTemplate
         };
         
         var rows = data.map(function(datum) {
           /*jshint ignore:start */
           return <CARD data={datum} dkey={datum.key} config={config}>{datum} </CARD>
           /*jshint ignore:end */
         });
       }
    
       return (
         /*jshint ignore:start */
         <pre className="">Cards2
           {rows} 
         </pre>
         /*jshint ignore:end */
      );
    }
  });  
});
