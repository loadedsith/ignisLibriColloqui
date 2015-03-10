define(['react', 'bezierEasing'], function(React, BezierEasing) {
  'use strict';
  var getCardFromChild = function(element, maxAttempts) {
    if (element.classList.contains('card')) {
      return element;
    }
    if (maxAttempts === undefined) {maxAttempts = 6;}
    var attemptsLeft = maxAttempts;
    if (element !== undefined && element !== null) {
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
  return React.createClass({
    getDefaultProps: function() {

      return {
        // allow the initial position to be passed in as a prop
        initialPos: {x: 10, y: 10}
      };
    },
    getInitialState: function() {
      var originalRotation;
      if (this.props.config.initialPosition.rotation === undefined) {
        originalRotation = Math.floor((Math.random()*6)-3);
      } else {
        originalRotation = this.props.config.initialPosition.rotation;
      }
      return {
        blur: 2,
        disableDrag: this.props.config.disableDrag,
        dragging: false,
        duration: this.props.config.duration || 250,
        easing: new BezierEasing(0.42, 0.0, 1.00, 1.0),
        opacity: 1,
        originalRotation: originalRotation,
        pos: this.props.config.initialPosition || {x:0, y:0},
        profile: this.props.config.profile || {},
        rel: null, // position relative to the cursor,
        rotation: originalRotation,
        underlay: document.getElementById('underlay')
      };
    },
    showUnderlay: function() {
      if (this.state.opacity !== 1 && this.state.underlay !== undefined) {
        //If dragging, add shown
        if (!this.state.underlay.classList.contains('shown')) {
          this.state.underlay.className = this.state.underlay.className + ' shown';
        }
      }else{
        //If not dragging, remove shown
        if (this.state.underlay.classList.contains('shown')) {
          this.state.underlay.className = this.state.underlay.className.replace(/\bshown\b/,'');
        }
      }

    },
    render: function() {

      React.initializeTouchEvents(true);

      //ignore react jsx, use the force to lint
      // the vars are included to avoid unused complaints
      /*jshint ignore:start */
      var rotation = this.state.originalRotation + this.state.rotation;
      if (this.state.blur < 2){
        this.state.blur = 2;
      }
      var blurOffset = this.state.blur + 'px ';
      var blur = blurOffset + blurOffset + this.state.blur * 1.75 + 'px rgba(0, 0, 0, 0.5)';
      var styles = {
        position: 'absolute',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px',
        opacity: this.state.opacity,
        boxShadow: blur,
        transform: 'rotate(' + rotation + 'deg)',
        'MozTransform': 'rotate(' + rotation + 'deg)',
        'msTransform': 'rotate(' + rotation + 'deg)',
        'WebkitTransform': 'rotate(' + rotation + 'deg)',
        'OTransform': 'rotate(' + rotation + 'deg)'
      };

      this.showUnderlay();

      var initialPosition = this.props.config.initialPosition;

      var cardTemplate;
      //card template must be a react object, if it is it's type is a function.
      try {
        cardTemplate = React.createElement(this.props.config.cardTemplate, {
          data: this.props.data,
          profile: this.props.config.profile,
          userProfile:this.props.config.userProfile
        }, this.props.data, ' ');
      } catch (error) {

        cardTemplate = <div>
          <p>
            Example card Content, set yours with card-template
          </p>
          <pre>
            {this.props.data}
          </pre>
        </div>
      }
      return <li
              onMouseDown= {this.handelMouse}
              onTouchStart= {this.handelMouse}
              className='card'
              style={styles}
              initialPosition={initialPosition}
              key={this.props.dkey}
              >
              {cardTemplate}
              </li>;
           /*jshint ignore:end */
    },

    componentDidUpdate: function(props, state) {
      if (this.state.dragging && !state.dragging) {
        window.addEventListener('mousemove', this.handelMouse);
        window.addEventListener('mouseup', this.handelMouse);
        window.addEventListener('touchstart', this.handelMouse);
        window.addEventListener('touchend', this.handelMouse);
        window.addEventListener('touchmove', this.handelMouse);
        window.addEventListener('touchcancel', this.handelMouse);

      } else if (!this.state.dragging && state.dragging) {
        window.removeEventListener('mousemove', this.handelMouse);
        window.removeEventListener('mouseup', this.handelMouse);
        window.removeEventListener('touchstart', this.handelMouse);
        window.removeEventListener('touchend', this.handelMouse);
        window.removeEventListener('touchmove', this.handelMouse);
        window.removeEventListener('touchcancel', this.handelMouse);

      }
    },

    fadeOut: function(callback) {
      //apply an animiation cardSlideRight
      if (this.state.underlay.classList.contains('shown')) {
        this.state.underlay.className = this.state.underlay.className.replace(/\bshown\b/,'');
      }

      var duration = this.props.config.duration || 250;//ms
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
          opacity:(1 - completeness)
        });
        requestAnimationFrame(this.fadeOut);
      } else {
        this.setState({
          opacity:0
        });

        if (typeof this.state.fadeCallback === 'function') {
          this.state.fadeCallback(this);
        }
      }
    },

    returnCard: function() {
      var duration = this.props.config.duration || 250;//ms
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
        } else {
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
    },

    handelMouse: function(event) {
      if(this.state.disableDrag === true){
        return;
      }

      var eventType = event.type;
      var card = getCardFromChild(event.target, 6);
      var maxDrag = this.props.config.maxDrag;
      if (maxDrag > window.innerWidth / 4) {
        maxDrag = window.innerWidth / 4;
      }
      if (!topOfTheStack(card)) {
        return;
      }

      var eventPageX = (event.pageX || event.touches[0].pageX || 0);
      switch (eventType) {
        case 'mousedown':
        case 'touchstart':
         // only left mouse button
          if (event.button === 0 || event.button === undefined) {
            this.setState({
              initialPos: this.props.config.initialPosition,
              dragging: true,
              rotation: this.state.rot,
              rel: {
                x: eventPageX
              }
            });
          }
          break;
        case 'mouseup':
        case 'touchend':
        case 'touchcancel':
          this.setState({
            dragging: false,
            droppedPos: this.state.pos,
            opacity: 1,
            startTime: new Date().getTime()
          });
          if (this.state.pos.x > maxDrag) {
            //dragged out right
            if (typeof this.props.config.swipeRight === 'function') {
              this.props.config.swipeRight(this, this.props.data);

            } else {
              this.returnCard();
            }
          } else if (this.state.pos.x < (-1 * maxDrag) ) {
            //dragged out left
            if (typeof this.props.config.swipeLeft === 'function') {
              this.props.config.swipeLeft(this, this.props.data);
            } else {
              this.returnCard();
            }

          } else {
            this.returnCard();
          }
          break;
        case 'mousemove':
        case 'touchmove':
          eventPageX = (event.pageX || event.touches[0].pageX);
          var xPos = eventPageX - this.state.rel.x + this.state.initialPos.x;
          var opacity = 1;
          if (xPos > (maxDrag/2)) {
            var ratio = maxDrag/xPos;
            if (ratio >= 0) {
              opacity = ratio;
            }
          }else if (xPos < (-1 * (maxDrag/2))) {
            if (maxDrag/xPos < 0) {
              opacity = maxDrag/(-1 * xPos);
            }
          }

          if (this.state.dragging === true) {
            var dragFactor = (window.innerWidth / 2 - eventPageX);
            this.setState({
              rotation: -1 * dragFactor / 20,
              blur: (dragFactor > 0 ? dragFactor / 45 : -1 * dragFactor / 45),
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