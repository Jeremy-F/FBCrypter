/// <reference path="../typings/chrome.d.ts" />
//
// chrome.runtime.onMessage.addListener((message : string,
//                                       sender : MessageSender,
//                                       sendResponse : Function) => {
//     console.log(message);
//     console.log(sender);
//     sendResponse("Tiens ta réponse batard : "+message);
//     console.log("fuck les test ! ");
// });
/* Dès qu'une page est chargé */
chrome.webNavigation.onCompleted.addListener(function (details) {
    /* Affichage des details */
    chrome.tabs.executeScript(details.tabId, {
        file: "include/ts/network.js",
        runAt: "document_end"
    });
    /* Injectionn du script "front-end" dans la page */
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
    console.log("Coucou toi :D");
    alert("Une page a ete chargé...");
}, { url: [{ urlPrefix: "https://www.facebook.com/messages" }] });
//# sourceMappingURL=Main.js.map