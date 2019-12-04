const url = parent.document.URL;

var videoId = url.match(
  /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
);
if (videoId != null && videoId.length > 1) {
  videoId = videoId[1].trim();
  console.log("video id = ", videoId);
} else {
  console.log("The youtube url is not valid.");
}

var hasLiveStream = document.getElementsByTagName(
  "yt-live-chat-message-input-renderer"
);

if (hasLiveStream && videoId) {
  var liveChat = document.getElementsByTagName("yt-live-chat-renderer")[0];
  var overlay = document.createElement("iframe");
  // overlay.src = chrome.extension.getURL("index.html");
  overlay.src = chrome.extension.getURL("index.html?v=" + videoId);
  liveChat.append(overlay);
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "white";
  console.log(liveChat);

  // overlay live chat header
  // var liveChatHeader = document.getElementsByTagName("yt-live-chat-header-renderer")[0];
  //  var headerOverlay = document.createElement("div");
  //  liveChatHeader.append(headerOverlay);
  //  headerOverlay.style.width = "100%";
  //  headerOverlay.style.height = "100%";
  //  headerOverlay.style.backgroundColor = "white";

  //Removes header elements on top of our overlay
  var topChat = document.getElementById("primary-content");
  topChat.parentNode.removeChild(topChat);
  var options = document.querySelectorAll(
    "yt-icon.style-scope.yt-live-chat-header-renderer"
  )[0];
  options.parentNode.removeChild(options);
  var space = document.getElementById("overflow");
  space.parentNode.removeChild(space);

  //  // overlay live chat messages
  //  var liveChatBox = document.getElementById("chat");
  //  var overlay  = document.createElement("iframe");
  //  overlay.src  = chrome.extension.getURL("chat-app.html");
  //  liveChatBox.append(overlay)
  //  overlay.style.width = "100%";
  //  overlay.style.height = "100%";
  //  overlay.style.backgroundColor= "white"

  //  //overlay text box
  // var text = document.querySelectorAll('yt-live-chat-text-input-field-renderer')[0];
  // var inputOverlay = document.createElement('input');
  // inputOverlay.setAttribute('type', 'text');
  // text.parentNode.appendChild(inputOverlay);
  // inputOverlay.style.width = '100%';
  // inputOverlay.style.height = '100%';
  // inputOverlay.style.backgroundColor = 'white';

  // //remove Youtube's textbox
  // text.parentNode.removeChild(text);

  // //disable send button
  // var pickerbuttons = document.getElementById('picker-buttons');
  // pickerbuttons.parentNode.removeChild(pickerbuttons);
  // var sendbuttons = document.getElementById('message-buttons');
  // // var width = overlay.style.width.clientWidth
  // // console.log(width)
  // sendbuttons.style.paddingLeft = "600px";
  // var submit = document.getElementById('send-button');
  // submit.onclick = submit_text;
}

// Observe message updates in realtime
const observeChat = () => {
  const items = document.querySelector(
    "#items.yt-live-chat-item-list-renderer"
  );
  if (!items) {
    return;
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const nodes = Array.from(mutation.addedNodes);
      nodes.forEach(node => {
        console.log(node);
      });
    });
  });
  observer.observe(items, { childList: true });
};

// Register the observer
document.addEventListener("DOMContentLoaded", async () => {
  chrome.runtime.sendMessage({ id: "contentLoaded", data: {} }, data => {
    observeChat();
  });
});

//clicking the submit button
// function submit_text(){
//   var input_value = inputOverlay.value
//   alert(input_value)
// }
