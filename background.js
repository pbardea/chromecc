function displayCaption(info, tab){
  if (tab) {
    chrome.tabs.sendMessage(tab.id, {message:'showCaption'});
  }
}

function setCaptionTo(info, tab, line){
  if (tab){
    chrome.tabs.sendMessage(tab.id, {message:'changeLine',newLine:line});
  }
}

function hideCaption(info, tab){
  if (tab){
    chrome.tabs.sendMessage(tab.id, {message:'hideCaption'});
  }
}

function toggleCaption(info, tab){
  if (tab){
    chrome.tabs.sendMessage(tab.id, {message:'isCaption'}, function (response){
        if(response.found){
          hideCaption(info, tab);
        }else{
          displayCaption(info, tab);
        }
    });
  }
}

function isCaption(info, tab){
  if (tab){
    chrome.tabs.sendMessage(tab.id, {message:'isCaption'}, function (response){
        return respsonse.found; 
    });
  }
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
  toggleCaption(info, tab);
});

