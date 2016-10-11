"use strict";
var FacebookScriptMain_1 = require("./FacebookScriptMain");
var FacebookUser = (function () {
    function FacebookUser(ident) {
        this.ident = ident;
        this.haveInitializedConversation();
    }
    FacebookUser.prototype.uncrypt = function (message, methode) {
        chrome.runtime.sendMessage(FacebookScriptMain_1.FacebookScriptMain.getExtensionID(), {
            "requestType": "uncryptMessage",
            "facebookIdent": this.ident,
            "cryptedMessage": message
        }, function (response) { methode(response); });
    };
    FacebookUser.prototype.haveInitializedConversation = function () {
        var _this = this;
        chrome.runtime.sendMessage(FacebookScriptMain_1.FacebookScriptMain.getExtensionID(), {
            "requestType": "initializedConversation",
            "facebookIdent": this.ident
        }, function (haveInitializedConversation) {
            if (haveInitializedConversation) {
                _this.readAllMessages();
            }
        });
    };
    FacebookUser.prototype.toString = function () {
        return "Identifiant de l'utilisateur : " + this.ident;
    };
    return FacebookUser;
}());
exports.FacebookUser = FacebookUser;
//# sourceMappingURL=FacebookUser.js.map