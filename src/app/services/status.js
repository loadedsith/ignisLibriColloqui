angular.module("ignisLibriColloqui.Status",[])
  .service('StatusService', ['$timeout','$interval', function ($timeout, $interval) {
    var Status = this;
    
    Status.default = {
      text:"Default Status",
      class:"status-default"
    };
    /*    
    //Some examples of statuses
    Status.loading = {
      text:"Loading...",//[Optional] Label text 
      class:"status-loading",// CSS Class available to angular, not automatically applied
      animation:{//[Optional] Requires frames and delay. Use either a string of frames:
        frames:"🌑🌒🌓🌔🌕🌖🌗🌘",
        // or Manual a frames array eg;
        //frames: ["Loading",
        //  "Loading",
        //  "Loading Loading",
        //  "🌔 Loading",
        //  "🌕 Loading",
        //  "🌖 Loading",
        //  "🌗 Loading",
        //  "🌘 Loading"],
        delay:10// in ms
      }
    };
   */

    // Status.resetAnimation = function () {
    //   if(Status.status !== undefined){
    //     if(Status.status.animation !== undefined){
    //       Status.status.animation = undefined;
    //     }
    //   }
    // };
    
    Status.setStatus = function (newStatus) {
      if (newStatus === undefined) {
        console.log('Hey buddy, you\'re supposed to send in a real status, but for some reason, you set it to undefined');
      }
      console.log('setStatus',newStatus);
      // Status.resetAnimation();
      Status.processLowercaseStatusFrames();
      if (Status.runningAnimator !== true){
        Status.animator();
        Status.runningAnimator !== true;
      }
      Status.status = newStatus;
      
    };
    
    Status.animation = {
      max : function(){return Status.status.animation.length||0},
      startTime : Date.now(),
      
      charsToFrames : function (str) {
        var split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
        var arr = [];
          for (var i=0; i < split.length; i++) {
            var char = split[i]
            if (char !== "") {
              arr.push(char);
            }
          }
          return arr;
      },
      
      frames : [],
      
      interval : function (now) {
        $timeout(function () {
          if (Status.status === undefined){
            window.requestAnimationFrame(Status.animation.interval);
            
            return;
          }
          if (Status.status.animation === undefined) {
            //Status.resetAnimation();
          }else{
            var delta = Math.floor( (Status.animation.startTime - now) / Status.status.animation.delay);

            //Dont continue if the delta hasn't changed (there's nothing todo as all animations are based off the delta)
            if(delta === Status.animation.lastDelta){
              window.requestAnimationFrame(Status.animation.interval);
              return;
            }
            
            Status.animation.lastDelta = delta;
            var frames = Status.animation.frames;
            var frameId =  delta % frames.length;
            
            if(Status.status.animation.randomize !== undefined){
              if(Status.status.animation.randomize === true){
                frameId = Math.floor(Math.random()*frames.length);
              }
            }
            
            var theFrame = frames[frameId];
            if (typeof theFrame === "function") {
              Status.status.currentFrame = theFrame();
            } else {
              Status.status.currentFrame = theFrame;
            }
            
            window.requestAnimationFrame(Status.animation.interval);
          }
        },0)
      }
    };
    
    Status.processLowercaseStatusFrames = function () {
      if (Status.status === undefined) {
        //Status.status is the current status, yet, it is undefined.
        return;
      }
      if(Status.status.animation === undefined){
        //there is a status, but it has no animation
        return;
      }
      if (typeof Status.status.animation.frames === "string") {
        Status.animation.frames = Status.animation.charsToFrames(Status.status.animation.frames).reverse();
      } else {
        Status.animation.frames = Status.status.animation.frames.reverse();
      }
    }
    
    Status.animator = function () {
      if (Status.status === undefined){
        if (Status.debug === true) {
          console.log('Cant animate the current status as it is undefined.');
        }
        return;
      }else if(Status.status.animation === undefined){
        if (Status.debug === true) {
          console.log('Cant animate the current status\'s animation as it is undefined.');
        }
        return;
      }else{
        var animation = Status.status.animation;

        if(animation.frames === undefined || animation.delay === undefined){
          console.log('No animation frames or delay defined for animation. Both must be present.');
          return;
        }
        window.requestAnimationFrame(Status.animation.interval);
      }
    }

  }]);