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
          this.Interval = 1;
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
        obj.Interval = 1;
        obj.Tick = timer_tick;
        obj.Start();

        function timer_tick()
        {
          if(data[subCount].startTime === index){
            elem.innerHTML = data[subCount].text + ' ' + index;          
            subCount++;
          }
          else if(data[subCount].endTime === index){
            elem.innerHTML = ' ' + index;          
          }
          index++;
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
