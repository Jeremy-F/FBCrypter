console.log("Chargement du BackGround ! ");

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log("J'ai bien reçu un truc");
        console.log(request);
        console.log(sender);
        if(request.hasOwnProperty("requestType")){
            switch (request.requestType){
                case "initCryptedConversation" :
                    sendResponse({ok:"ok"});
                    break;
            }
        }
    }
);

chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.executeScript(details.tabId, {
        file: "include/ts/FacebookScript/FacebookUser.ts.js",
        runAt: "document_end"
    });
}, {url: [{urlPrefix: "https://www.facebook.com/messages"}]});

console.log("Fin de chargement du Background");