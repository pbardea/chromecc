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
    id: "enableCC",   // <-- mandatory with event-pages
    title: "Enable CC",
    contexts: ["all"]
});


// Register a listener for the `onClicked` event
chrome.contextMenus.onClicked.addListener(function(info, tab) {
	displayCaption();
});

