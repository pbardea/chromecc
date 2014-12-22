var enabled = "Enable CC";
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "loadCaption"){
            loadDataToCaption(request.data);
        }
    }
);

function loadDataToCaption(data){
  console.log(data);
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
      console.log(2);
		  var tab = tabs[0];
    	chrome.tabs.sendMessage(tab.id, {message:'loadCaption',data:data}, function(response){
        console.log(3);
    });
	});
}


function displayCaption(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		  var tab = tabs[0];
    	chrome.tabs.sendMessage(tab.id, {message:'showCaption'});
	});
}

function setCaptionTo(line){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		  var tab = tabs[0];
	    chrome.tabs.sendMessage(tab.id, {message:'changeLine',newLine:line});
	});
}

function hideCaption(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		  var tab = tabs[0];
	    chrome.tabs.sendMessage(tab.id, {message:'hideCaption'});
	});

}

function toggleCaption(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		  var tab = tabs[0];
    	chrome.tabs.sendMessage(tab.id, {message:'isCaption'}, function (response){
        	if(response.found){
          		hideCaption();
        	}else{
         		  displayCaption();
        	}
    	});
    });
    enabled = "Disable CC";
}

function isCaption(){
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		  var tab = tabs[0];
	    chrome.tabs.sendMessage(tab.id, {message:'isCaption'}, function (response){
	        return respsonse.found;
	    });
	});
}

//the following uses a context menu (ie right click menu)

// Create a context-menu
chrome.contextMenus.create({
<<<<<<< HEAD
    id: "enableCC",   // <-- mandatory with event-pages
    title: enabled,
=======
    id: "toggleCC",   // <-- mandatory with event-pages
    title: "Toggle CC",
>>>>>>> 18e9392cd749bcd9a7a9c578f93251e2af485d8a
    contexts: ["all"]
});


// Register a listener for the `onClicked` event
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    toggleCaption();
});

