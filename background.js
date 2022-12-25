// get the list of all open tabs in the current window
chrome.tabs.query({currentWindow: true}, function(tabs) {
    var links = [];

    for (var i = 0; i < tabs.length; i++) {
      links.push(tabs[i].url);
    }
  
    // listen for messages from the popup and send the list of URL 
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "getLinks") {
        sendResponse({ links: links });
      }
    });
  });
  