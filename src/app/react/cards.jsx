/* jshint unused: false */

/* {      
       var findKeyframesRule = function (rule) {
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
       for(var i = 0; i < cardSlideRightRules.cssRules.length; i ++)
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


define(['react'],function (React) {
  'use strict';
  var getCardFromChild = function (element, maxAttempts) {
    if(element.classList.contains('card')){
      return element;
    }
    if(maxAttempts===undefined){maxAttempts = 6;}
    var attemptsLeft = maxAttempts;
    if(!(element === undefined || element === null)){
      if(!(element.classList === undefined || element.classList === null)){
        while(!element.classList.contains('card') && attemptsLeft > 0){
          element = element.parentElement;
          attemptsLeft = attemptsLeft-1;
          if(!(element === undefined || element === null)){
            attemptsLeft = 0;
          }
        }
      }
    }
    return element;
  };
  
  var topOfTheStack = function (card) {
    if(card.nextSibling === null){
      return true;
    }
    return false;
  };
  
  var CARD = React.createClass({
    getDefaultProps: function () {
      return {
        // allow the initial position to be passed in as a prop
        initialPos: {x: 0, y: 0}
      };
    },
    getInitialState: function () {
      return {
        pos: this.props.initialPos,
        rotation: 0,
        opacity:1,
        dragging: false,
        rel: null // position relative to the cursor
      };
    },
    render: function (a,b,c) {
      var styles = {
        position: 'absolute',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px',
        opacity: this.state.opacity,
        transform: 'rotate(' + this.state.rotation + 'deg)'
      };
      var initialPos = {x: 100, y: 100};
           /*jshint ignore:start */
      return <li
              onMouseDown= {this.handelMouse} 
              className='card'
              style={styles}
              initialPos={initialPos}
              key={this.props.dkey}
              >{this.props.data} 
              </li>;
           /*jshint ignore:end */
              
    },
    componentDidUpdate: function (props, state) {
      if (this.state.dragging && !state.dragging) {
        document.addEventListener('mousemove', this.handelMouse);
        document.addEventListener('mouseup', this.handelMouse);
      } else if (!this.state.dragging && state.dragging) {
        document.removeEventListener('mousemove', this.handelMouse);
        document.removeEventListener('mouseup', this.handelMouse);
      }
    },
    returnCard: function () {
      var duration = 1250;//ms
      if (this.state.dragging===false){
        if (this.state.startTime === undefined){
          this.setState({
            startTime: new Date().getTime()
          });
        }
        var now = new Date().getTime();
        var completeness = (now - this.state.startTime) / duration;

        if (completeness < 1) {
          this.setState({
            rotation: this.state.rotation * (1 - completeness),
            pos:{
              x: this.state.pos.x * (1 - completeness)
            }
          });
        }
      }
      if(this.state.pos.x < 1 && this.state.pos.x > -1){
        this.setState({
          startTime:undefined
        })
      }else{
        console.log('this.state.pos.x', this.state.pos.x);
        requestAnimationFrame(this.returnCard);
      }
    },
    handelMouse: function (event) {
      var eventType = event.type;
      var card = getCardFromChild(event.target, 6);
      
      if(!topOfTheStack(card)){
        return;
      }
      switch(eventType){
        case 'mousedown':
          console.log('mouseDown');

         // only left mouse button
          if (event.button !== 0) {
            return;
          }
          var pos = this.getDOMNode().getBoundingClientRect();
          this.setState({
            initialPos:{x:100,y:100},
            dragging: true,
            rotation:0,
            rel: {
              x: event.pageX,
              // y: event.pageY - pos.top
            }
          });
          
          break;
        case 'mouseup':
          console.log('mouseUp');
          this.setState({
            dragging: false,
            startTime: new Date().getTime()
          });
          if(this.state.pos.x>this.props.maxdrag){
            this.props.swiperight(this)
          }else if(this.state.pos.x< (-1 * this.props.maxdrag) ){
            this.props.swipeleft(this)
          }else{
            this.returnCard();
          }
          break;
        case 'mousemove':
          console.log('mouseMove');
          
          var xPos = event.pageX - this.state.rel.x;
          var opacity = 1;
          if (xPos > (this.props.maxdrag/2)){
            var ratio = this.props.maxdrag/xPos
            if ( ratio >= 0){
              opacity = ratio;
            }
          }else if(xPos < (-1 * (this.props.maxdrag/2))){
            if (this.props.maxdrag/xPos < 0){
              opacity = this.props.maxdrag/(-1 * xPos);
            }
          }
          if (this.state.dragging){
            this.setState({
              rotation: -1 * (window.innerWidth / 2 - event.pageX)/45,
              opacity: opacity,
              pos: {
                x: xPos
              }
            });
          }
          
          break;
        default :
          return;//dont stopPropagation or preventDefault
      }
      event.stopPropagation();
      event.preventDefault();
    }    
  });
  
   return  React.createClass({
     render: function() {
       var data = this.props.data;
       var maxDrag = this.props.maxDrag;
       var swipeRight = this.props.swiperight;
       var swipeLeft = this.props.swipeleft;
       
       if (data !== undefined) {
         var rows = data.map(function (datum) {
           /*jshint ignore:start */
           return <CARD data={datum} dkey={datum.key} maxdrag={maxDrag} swiperight={swipeRight} swipeleft={swipeLeft}>{datum} </CARD>
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
