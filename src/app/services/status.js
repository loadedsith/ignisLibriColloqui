angular.module("ignisLibriColloqui.Status",[])
  .service('StatusService', ['$timeout','$interval', function ($timeout,$interval) {
    var Status = this;

/*    
      Status.loading = {
      text:"Loading...",
      class:"status-loading",
      animation:{
        chars:"🌑🌒🌓🌔🌕🌖🌗🌘",
        delay:10
      }
    };
  
    Status.ready = {
      text:"Ready",
      class:"status-ready"
    };*/
    
    Status.resetAnimation = function () {
      Status.animation = undefined;
    };

    Status.animator = function () {
      var animation = Status.status.animation;

      if(animation===undefined){
        Status.resetAnimation();
        return;
      }else{
        if(animation.chars === undefined || animation.delay === undefined){
          console.log('no animation chars or delay defined for animation. Both must be present.');
          Status.resetAnimation();
          return;
        }
        Status.animation = {
          max : Status.status.animation.length,
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
              if(Status.status.animation===undefined){
                Status.resetAnimation();
              }else{
                var delta = Math.floor( Status.animation.startTime - now);
                var frames = Status.animation.frames;
                var frameId =  delta % frames.length;
                Status.status.animated = frames[frameId];
                window.requestAnimationFrame(Status.animation.interval);
              }
            },0)
          }
        };
        
        Status.animation.frames = Status.animation.charsToFrames(Status.status.animation.chars);
        window.requestAnimationFrame(Status.animation.interval);
      }
    }

  }]);