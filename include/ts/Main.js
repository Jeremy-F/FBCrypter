/// <reference path="../typings/chrome.d.ts" />
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    console.log(sender);
    sendResponse("Tiens ta réponse batard : " + message);
    console.log("fuck les test ! ");
});
/* Dès qu'une page est chargé */
chrome.webNavigation.onCompleted.addListener(function (details) {
    // Execution
    // chrome.tabs.executeScript(details.tabId, {
    //     file : "FacebookMessageScript.js"
    // });
    // chrome.runtime.onMessage.addListener((message : string,
    //                                       sender : MessageSender,
    //                                       sendResponse : Function) => {
    //     console.log(message);
    //     console.log(sender);
    //     console.log("fuck les test ! ");
    // });
    chrome.runtime.sendMessage("Bonjour, voici un message de ma part :D" + details.tabId);
}, { url: [{ urlPrefix: "https://www.facebook.com/messages" }] });
//# sourceMappingURL=Main.js.map