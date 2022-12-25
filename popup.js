// send a message to the background script to request the list of URLs
chrome.runtime.sendMessage({ action: "getLinks" }, function(response) {

    var links = response.links;
  
    var linkList = document.getElementById("link-list");
  
    for (var i = 0; i < links.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = links[i];
      a.textContent = links[i];
      li.appendChild(a);
      linkList.appendChild(li);
    }
  
    // add a "Copy to clipboard" button
    var copyButton = document.createElement("button");
    copyButton.id = "copy-button";
    copyButton.textContent = "Copy to clipboard";
    document.body.appendChild(copyButton);
  
    // add a click event listener to the button
    copyButton.addEventListener("click", function() {
      var textarea = document.createElement("textarea");
  
      textarea.value = links.join("\n - ");
      document.body.appendChild(textarea);
      textarea.select();
  
      // copy the selected text to the clipboard using the Clipboard API
      navigator.clipboard.writeText(textarea.value).then(function() {
        console.log("Copied to clipboard");
      }, function(err) {
        console.error("Failed to copy to clipboard:", err);
      });

      var message = document.createElement("p");
      message.textContent = "Links copied!";
      message.className = "text-center";
      copyButton.parentNode.appendChild(message);
  
      document.body.removeChild(textarea);
    });
  });
  