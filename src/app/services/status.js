angular.module("ignisLibriColloqui.Status",[])
  .service('StatusService', ['$timeout','$interval', function ($timeout,$interval) {
    var Status = this;

    /*    
    
    Status.loading = {
      text:"Loading...",
      class:"status-loading",
      animation:{
        chars:"🌑🌒🌓🌔🌕🌖🌗🌘",//or frames:["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"],
        delay:10
      }
    };
  
    Status.ready = {
      text:"Ready",
      class:"status-ready"
    };
   */
    
    Status.resetAnimation = function () {
      Status.animation = undefined;
    };

    Status.animator = function () {
      var animation = Status.status.animation;

      if(animation===undefined){
        Status.resetAnimation();
        return;
      }else{
        if(animation.frames === undefined || animation.delay === undefined){
          console.log('no animation frames or delay defined for animation. Both must be present.');
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
                var delta = Math.floor( (Status.animation.startTime - now) / Status.status.animation.delay);


                if(delta === Status.animation.lastDelta){

                  window.requestAnimationFrame(Status.animation.interval);
                  return;
                }else{
                  console.log('!delta', delta);
                }
                console.log('Musician Yellow-banded Dart frog');
                Status.animation.lastDelta = delta;
                var frames = Status.animation.frames;
                var frameId =  delta % frames.length;
                
                if(Status.status.animation.randomize !== undefined){
                  if(Status.status.animation.randomize === true){
                    frameId = Math.floor(Math.random()*frames.length);
                  }
                }
                
                
                Status.status.animated = frames[frameId];
                window.requestAnimationFrame(Status.animation.interval);
              }
            },0)
          }
        };
        
        if(typeof Status.status.animation.frames === "string"){
          Status.animation.frames = Status.animation.charsToFrames(Status.status.animation.frames).reverse();
        }else{
          Status.animation.frames = Status.status.animation.frames.reverse();
        }
        window.requestAnimationFrame(Status.animation.interval);
      }
    }

  }]);