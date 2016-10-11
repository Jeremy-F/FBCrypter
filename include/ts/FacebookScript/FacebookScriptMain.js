"use strict";
var FacebookUser_1 = require("./FacebookUser");
var FacebookMessage_1 = require("./FacebookMessage");
/// <reference path="../../typings/chrome.d.ts" />
/// <reference path="../../typings/jquery.d.ts"/>
var FacebookScriptMain = (function () {
    function FacebookScriptMain() {
    }
    FacebookScriptMain.getExtensionID = function () {
        return this.extensionID;
    };
    FacebookScriptMain.setCurrentUser = function (currentUser) {
        FacebookScriptMain.currentUser = currentUser;
    };
    FacebookScriptMain.getCurrentUser = function () {
        return FacebookScriptMain.currentUser;
    };
    /**
     * listenerConversationList : Method
     * @param null
     * @return null
     *
     */
    FacebookScriptMain.listenerConversationList = function () {
        var allConversationsLink = document.querySelectorAll("._k_");
        if (allConversationsLink.length > 0) {
            var _loop_1 = function(i) {
                var conversationLink = allConversationsLink.item(i);
                conversationLink.addEventListener("click", function (event) {
                    var conversationHref = conversationLink.getAttribute("href");
                    var identifiant = conversationHref.substring(34, conversationHref.length);
                    FacebookScriptMain.setCurrentUser(new FacebookUser_1.FacebookUser(identifiant));
                    /**
                     * 1 - On détecte l'identnifiant Facebook du Membre (number/String)
                     * 2 - Si une conversation est en cours avec ce membre alors :
                     *** Là il faut modifier toute la page
                     * *   1 - Penser à modifier le textarea
                     * *   2 - Si le textarea contient déjà des données on les retranscrit directement dans notre nouveau Textarea
                     * *   3 - Creation de l'évenement "onKeyUP sur le keyCode 13 (Enter)
                     * **/
                });
            };
            for (var i = 0; i < allConversationsLink.length; i++) {
                _loop_1(i);
            }
        }
        else {
            throw new Error("The links of all your conversation are not findable");
        }
    };
    FacebookScriptMain.listenerConversationMessage = function () {
        var conversationDiv = document.querySelector("#webMessengerRecentMessages");
        conversationDiv.addEventListener("DOMSubtreeModified", function (event) {
            // Detection de l'ensemble des messages présent
            FacebookMessage_1.FacebookMessage.readAndDecrypt();
        });
    };
    FacebookScriptMain.launch = function () {
        FacebookScriptMain.listenerConversationList();
        FacebookScriptMain.listenerConversationMessage();
    };
    FacebookScriptMain.extensionID = "acpkbohefhcjnfckcppfnlkcnhomblld";
    return FacebookScriptMain;
}());
exports.FacebookScriptMain = FacebookScriptMain;
FacebookScriptMain.launch();
//# sourceMappingURL=FacebookScriptMain.js.map