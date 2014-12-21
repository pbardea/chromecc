function displayCaption(info, tab){
  if (tab) {
      //Create the code to be injected
      var code = [
          'var d = document.createElement("div");',
          'd.setAttribute("style", "'
              + 'background-color: black; '
              + 'color: white;'
              + 'fontSize: large;'
              + 'position: fixed; '
              + 'bottom: 20px; '
              + 'left: 30px; '
              + 'z-index: 2147483647; '
              + '");',
          'd.setAttribute("id", "caption");',
          'd.innerHTML="Welcome to Chrome CC!";',
          'document.body.appendChild(d);'
      ].join("\n");
      var movieTabId = tab.id;

      //Inject the code into the current tab
      chrome.tabs.executeScript(movieTabId, { code: code });
    }
}

function setCaptionTo(info, tab, line){
  if (tab){
    var code = 'document.getElementById("caption").innerHTML ="'+line+'";';
    chrome.tabs.executeScript(tab.id, {code: code});
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
  displayCaption(info, tab);
  //setCaptionTo(info,tab,"NEW LINE PLEASE!");
  playScript(info, tab, "file:///Users/pbardea/chromecc/example.srt");
});

