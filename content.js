chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if(request.message == 'showCaption') {
        var d = document.createElement("div");
        d.setAttribute("style", "background-color:black; color: white; fontSize:large;position: fixed; bottom: 20px; left: 30px; z-indez:2147483647;");    
        d.setAttribute("id","caption");
        d.innerHTML="Welcome to ChromeCC!";
        document.body.appendChild(d);
    }else if(request.message == 'changeLine') {
        document.getElementById("caption").innerHTML=request.newline;
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
