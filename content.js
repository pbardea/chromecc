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
        var Timer = function(){        
          // object properties
          this.Interval = 10;
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
        obj.Interval = 10;
        obj.Tick = timer_tick;
        obj.Start();

        function timer_tick()
        {
          var start = Math.round(data[subCount].startTime/100)*100;
          var end = Math.round(data[subCount].endTime/100)*100;
          if(start === index){
            elem.innerHTML = data[subCount].text + ' ' + index;          
          }
          else if(end === index){
            elem.innerHTML = ' ' + index;          
            subCount++;
          }
          index+=10;
          if(subCount === (request.data.length -1))
            obj.Stop();
        }

        sendResponse();
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
