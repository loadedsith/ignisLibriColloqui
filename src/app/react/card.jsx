define(['react','bezier-easing'],function (React, BezierEasing) {
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

  return React.createClass({
    getDefaultProps: function () {
      return {
        // allow the initial position to be passed in as a prop
        initialPos: {x: 10, y: 10}
      };
    },
    getInitialState: function () {
      var originalRotation = Math.floor((Math.random()*6)-3);
      return {
        pos: this.props.config.initialPosition||{x:0,y:0},
        duration:this.props.config.duration||250,
        rotation: originalRotation,
        originalRotation: originalRotation,
        easing: new BezierEasing(0.42, 0.0, 1.00, 1.0),
        opacity:1,
        dragging: false,
        rel: null // position relative to the cursor
      };
    },
    render: function () {
      //ignore react jsx, use the force to lint
      // the vars are included to avoid unused complaints
      /*jshint ignore:start */
      var rotation = this.state.originalRotation + this.state.rotation;
      var styles = {
        position: 'absolute',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px',
        opacity: this.state.opacity,
        transform: 'rotate(' + rotation + 'deg)'
      };
      var initialPosition = this.props.config.initialPosition;
      
      var cardTemplate;
      //card template must be a react object, if it is it's type is a function.
      try {
        cardTemplate = React.createElement(this.props.config.cardTemplate, {
          data: this.props.data
        }, this.props.data, " ");
      } catch (error) {
        cardTemplate = <div>{this.props.data}, Example card Content, set yours with card-template</div>
      }
    
      return <li
              onMouseDown= {this.handelMouse} 
              className='card'
              style={styles}
              initialPosition={initialPosition}
              key={this.props.dkey}
              >
              {cardTemplate}
              </li>;
           /*jshint ignore:end */
              // <img src="{this.props.data.image.data.url}" alt="" />
//                             
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
    fadeOut: function (callback) {
      //apply an animiation cardSlideRight
      var duration = this.props.config.duration||250;//ms
      if (this.state.fadeStart === undefined) {
        this.setState({
          fadeCallback: callback
        });
      }
      if (this.state.fadeStart === undefined) {
        this.setState({
          fadeStart: new Date().getTime()
        });
      }
      var now = new Date().getTime();
      var completeness = (now - this.state.fadeStart) / duration;
      
      if (completeness < 1) {
        this.setState({
          opacity:(1-completeness)
        });
        requestAnimationFrame(this.fadeOut);
      }else{
        this.setState({
          opacity:0
        });
        
        if(typeof this.state.fadeCallback === 'function'){
          this.state.fadeCallback(this);
        }
      }
    },
    returnCard: function () {
      var duration = this.props.config.duration||250;//ms
      if (this.state.dragging === false) {
        if (this.state.startTime === undefined) {
          this.setState({
            startTime: new Date().getTime()
          });
        }
        var now = new Date().getTime();
        var completeness = (now - this.state.startTime) / duration;
        if (completeness < 1) {
          // completeness = this.state.easing(completeness)
          //the animations duration has not yet elapsed
          var distance = this.state.droppedPos.x - this.state.initialPos.x;
          this.setState({
            rotation: this.state.rotation * (1 - completeness),
            pos:{
              // offset + current position * completeness
              x: this.state.droppedPos.x - (distance * (completeness)) 
            }
          });
          requestAnimationFrame(this.returnCard);
        }else{
          this.setState({
            startTime:undefined,
            //force the final frame of the card returning animation
            rotation: this.state.originalRotation,
            pos:{
              x: this.state.initialPos.x
            }
          });
        }
      }
      // if(this.state.pos.x < this.state.initialPos.x && this.state.pos.x > -(this.state.initialPos.x)){
      // }else{
        //loop over this function until card is returned.
        // requestAnimationFrame(this.returnCard);
      // }
    },
    handelMouse: function (event) {
      var eventType = event.type;
      var card = getCardFromChild(event.target, 6);
      var maxDrag = this.props.config.maxDrag;
      if(!topOfTheStack(card)){
        return;
      }
      switch(eventType){
        case 'mousedown':
          console.log('mouseDown');
         // only left mouse button
          if (event.button === 0) {
            // var pos = this.getDOMNode().getBoundingClientRect();
            this.setState({
              initialPos:this.props.config.initialPosition,
              dragging: true,
              rotation:0,
              rel: {
                x: event.pageX,
                // y: event.pageY - pos.top
              }
            });
          }
          break;
        case 'mouseup':
          console.log('mouseUp');
          this.setState({
            dragging: false,
            droppedPos: this.state.pos,
            opacity: 1,
            startTime: new Date().getTime()
          });
          if(this.state.pos.x > maxDrag){
            //dragged out right
            if (typeof this.props.config.swipeRight === 'function'){
              this.props.config.swipeRight(this, this.props.data);
              
            }else{
              this.returnCard();
            }
          }else if(this.state.pos.x < (-1 * maxDrag) ){
            //dragged out left
            if (typeof this.props.config.swipeLeft === 'function'){
              this.props.config.swipeLeft(this, this.props.data);
            }else{
              this.returnCard();
            }


          }else{
            this.returnCard();
          }
          break;
        case 'mousemove':
          console.log('mouseMove');


          var xPos = event.pageX - this.state.rel.x + this.state.initialPos.x;
          var opacity = 1;
          if (xPos > (maxDrag/2)){
            var ratio = maxDrag/xPos;
            if ( ratio >= 0){
              opacity = ratio;
            }
          }else if(xPos < (-1 * (maxDrag/2))){
            if (maxDrag/xPos < 0){
              opacity = maxDrag/(-1 * xPos);
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
});