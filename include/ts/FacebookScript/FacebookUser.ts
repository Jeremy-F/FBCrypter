import {FacebookMessage} from "./FacebookMessage";
import {FacebookScriptMain} from "./FacebookScriptMain";

export class FacebookUser{
    /// <reference path="../../typings/chrome.d.ts" />

    private ident : any; // Soit un nombre, soit une string

    constructor(ident : any) {
        this.ident = ident;
        this.haveInitializedConversation();
    }
    public uncrypt(message:String, methode : Function){
        chrome.runtime.sendMessage(FacebookScriptMain.getExtensionID(), {
            "requestType" : "uncryptMessage",
            "facebookIdent" : this.ident,
            "cryptedMessage" : message
        }, (response) => {methode(response)});
    }
    
    private haveInitializedConversation() {

        chrome.runtime.sendMessage(FacebookScriptMain.getExtensionID(), {
            "requestType" : "initializedConversation",
            "facebookIdent" : this.ident
        }, (haveInitializedConversation) => {
            if(haveInitializedConversation){
                this.readAllMessages();
            }
        });
        
    }
    public toString():String{
        return "Identifiant de l'utilisateur : "+this.ident;
    }
}