/* Create a context-menu */
chrome.contextMenus.create({
    id: "myContextMenu",   // <-- mandatory with event-pages
    title: "Click me",
    contexts: ["all"]
});

/* Register a listener for the `onClicked` event */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  alert("hi")
    if (tab) {
        /* Create the code to be injected */
        var code = [
            'var d = document.createElement("div");',
            'd.setAttribute("style", "'
                + 'background-color: black; '
                + 'color: white;'
                + 'fontSize: large;'
                + 'position: fixed; '
                + 'bottom: 20px; '
                + 'left: 30px; '
                + 'z-index: 9999; '
                + '");',
            'd.innerHTML="HELLO!";',
            'document.body.appendChild(d);'
        ].join("\n");

        /* Inject the code into the current tab */
        chrome.tabs.executeScript(tab.id, { code: code });
    }
});

