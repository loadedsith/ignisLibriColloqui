define(['services/serviceModule', 'angular', 'firebase', 'requestAnimationFrame'],
function(services, angular, Firebase, requestAnimationFrame) {
  'use strict';
  return services.service('StatusService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    'use strict';

    var _this = this;

    _this.debug = true;

    _this.loading = {
      text:'Loading...',
      class:'status-loading',
      animation:{
        frames: '🐶🐱🐭🐹🐰🐸🐯🐨🐻🐷🐮🐼🐙🌞🌝😺👲👳👮👷💂👵👴👨👧👦👶👱👼👺👹',
        randomize: true,
        delay: 150
      }
    };

    _this.ready = {
      text:'Ready',
      class:'status-ready',
      animation:{
        frames:'🔥📖💬',
        // frames:['😃', '👍'],
        delay:1500
      }
    };

    /*
    //Some examples of statuses
    _this.loading = {
      text:'Loading...', //[Optional] Label text
      class:'status-loading', // CSS Class available to angular, not automatically applied
      callback: function() {
        console.log('Im a callback!');
      }
      animation:{//[Optional] Requires frames and delay. Use either a string of frames:
        frames:'🌑🌒🌓🌔🌕🌖🌗🌘',
        // or Manual a frames array eg;
        //frames: ['Loading',
        //  'Loading',
        //  'Loading Loading',
        //  '🌔 Loading',
        //  '🌕 Loading',
        //  '🌖 Loading',
        //  '🌗 Loading',
        //  '🌘 Loading',
        //  function() {return $scope.message}// You can even use a function call as a frame. Result should be a string.
        //],
        delay:10// in ms
      }
    };
   */

    // _this.resetAnimation = function() {
    //   if (_this.status !== undefined) {
    //     if (_this.status.animation !== undefined) {
    //       _this.status.animation = undefined;
    //     }
    //   }
    // };
    _this.defaultAction = function() {
      console.log('No action has been defined for this status');
    };
    _this.setStatus = function(newStatus) {
      if (newStatus === undefined) {
        console.log('Set status failed; newStatus was undefined.');
      }
      if (_this.status === newStatus) {
        //nothing has changed, so do nothing
        return;
      }
      if (!('action' in newStatus)) {
        newStatus.action = _this.defaultAction;
      }
      _this.status = newStatus;
      _this.processLowercaseStatusFrames();
      if (typeof _this.status.callback === 'function') {
        _this.status.callback();
      }
      if (_this.runningAnimator !== true) {
        _this.animator();
      }
    };

    _this.animation = {
      max : function() {return (_this.status.animation.length || 0);},
      startTime : Date.now(),

      charsToFrames : function(str) {
        var split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
        var arr = [];
        for (var i = 0; i < split.length; i++) {
          var char = split[i];
          if (char !== '') {
            arr.push(char);
          }
        }
        return arr;
      },

      frames : [],

      interval : function(now) {
        $timeout(function() {
          if (_this.status === undefined) {
            //dont do anything, but do keep animating
            window.requestAnimationFrame(_this.animation.interval);
            return;
          }
          if (_this.status.animation === undefined) {
            //dont do anything, but do keep animating
            window.requestAnimationFrame(_this.animation.interval);
            return;
          }
          var delta = Math.floor((_this.animation.startTime - now) / _this.status.animation.delay);

          //Dont continue if the delta hasn't changed (there's nothing todo as all animations are based off the delta)
          if (delta === _this.animation.lastDelta) {
            window.requestAnimationFrame(_this.animation.interval);
            return;
          }

          _this.animation.lastDelta = delta;
          var frames = _this.animation.frames;
          var frameId =  delta % frames.length;

          if (_this.status.animation.randomize !== undefined) {
            if (_this.status.animation.randomize === true) {
              frameId = Math.floor(Math.random() * frames.length);
            }
          }

          var theFrame = frames[frameId];
          if (typeof theFrame === 'function') {
            _this.status.currentFrame = theFrame();
          } else {
            _this.status.currentFrame = theFrame;
          }

          window.requestAnimationFrame(_this.animation.interval);
        }, 0);
      }
    };

    _this.processLowercaseStatusFrames = function() {
      if (_this.status === undefined) {
        //_this.status is the current status, yet, it is undefined.
        return;
      }
      if (_this.status.animation === undefined) {
        //there is a status, but it has no animation
        return;
      }
      if (typeof _this.status.animation.frames === 'string') {
        _this.animation.frames = _this.animation.charsToFrames(_this.status.animation.frames).reverse();
      } else {
        _this.animation.frames = _this.status.animation.frames.reverse();
      }
    };

    _this.animator = function() {
      if (_this.status === undefined) {
        _this.runningAnimator = false;
        if (_this.debug === true) {
          console.log('Cant animate the current status as it is undefined.');
        }
        return;
      }else if (_this.status.animation === undefined) {
        _this.runningAnimator = false;
        if (_this.debug === true) {
          console.log('Cant animate the current status\'s animation as it is undefined.');
        }
        return;
      } else {
        _this.runningAnimator = true;
        var animation = _this.status.animation;

        if (animation.frames === undefined || animation.delay === undefined) {
          console.log('No animation frames or delay defined for animation. Both must be present.');
          return;
        }
        window.requestAnimationFrame(_this.animation.interval);
      }
    };

    _this.getStatus = function() {return _this.status}

    //Watch for changes, and like a boss, update any listeners.
    $rootScope.$watch(_this.getStatus, function() {
      $rootScope.$broadcast('StatusService:Update', _this.status);
    }, true)

    return _this;
  }]);
});
