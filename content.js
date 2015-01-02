chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if(request.message == 'showCaption') {
        var d = document.createElement("div");
        d.setAttribute("style", "background-color:black; color: white; fontSize:large;position: fixed; bottom: 20px; left: 30px; z-indez:2147483647;");
        d.setAttribute("id","caption");
        d.innerHTML="Welcome to ChromeCC!";
        document.body.appendChild(d);
    }else if(request.message == 'loadCaption') {
        var data = request.data;
        if (document.getElementById("caption")==null){
          var d = document.createElement("div");
          d.setAttribute("style", "background-color:black; color: white; fontSize:large;position: fixed; bottom: 20px; left: 30px; z-indez:2147483647;");
          d.setAttribute("id","caption");
          d.innerHTML="Welcome to ChromeCC!";
          document.body.appendChild(d);
        }
        var elem = document.getElementById("caption");
        var CONST_MAGIC_NUMBER = 20;//idk how this works but it does dont question it. still have to calibrate it T__T
        var Timer = function(){        
          // object properties
          this.Interval = CONST_MAGIC_NUMBER;
          this.Enable = new Boolean(false);
          this.Tick;
          //member vars
          var timerId = 0;
          var thisObject;
          this.Start = function(){
              this.Enable = new Boolean(true);

              thisObject = this;
              if (thisObject.Enable){
                  thisObject.timerId = setInterval(function(){
                      thisObject.Tick(); 
                  }, thisObject.Interval);
              }
          };
          this.Stop = function(){            
              thisObject.Enable = new Boolean(false);
              clearInterval(thisObject.timerId);
          };
        };
        var index = 0;
        var subCount = 0;
        var obj = new Timer();
        obj.Interval = CONST_MAGIC_NUMBER;
        obj.Tick = timer_tick;
        obj.Start();

        function timer_tick(){
          var start = Math.round(data[subCount].startTime/10)*10;
          var end = Math.round(data[subCount].endTime/10)*10;
          //both start===index and end===index need to be replaced by some sort of almostEquals(a,b) function
          //the function takes into account what the closest possible value to start/end should be by taking
          //the index into account
          if(almostEquals(start, index)){
            elem.innerHTML = data[subCount].text + ' ' + index;          
          }
          else if(almostEquals(end, index)){
            elem.innerHTML = ' ' + index;          
            subCount++;
          }
          index+=CONST_MAGIC_NUMBER;//results in the closest thing we have to a millisecond worth of tolerance
          if(subCount === (request.data.length -1))
            obj.Stop();
        }

        function almostEquals(a, b){
          if(a===b) return true;
          var quotient = Math.round(a/CONST_MAGIC_NUMBER);
          var iterations = b/CONST_MAGIC_NUMBER;
          if(iterations === quotient) return true;
          else return false;
        }
;        sendResponse();
    }else if(request.message == 'changeLine') {
        if (document.getElementById("caption")){
           document.getElementById("caption").innerHTML=request.newline;
        }else{alert("NOHTING HERE");}
    }else if(request.message == 'hideCaption') {
        var element = document.getElementById("caption");
        element.parentNode.removeChild(element);
    }else if(request.message == 'isCaption'){
        var rsp = 0;
        if (document.getElementById("caption")!=null){
          rsp = 1;
        }
        sendResponse({found:rsp});
    }
});
