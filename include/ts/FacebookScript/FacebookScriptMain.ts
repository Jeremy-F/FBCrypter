import {FacebookUser} from "./FacebookUser";
import {FacebookMessage} from "./FacebookMessage";
/// <reference path="../../typings/chrome.d.ts" />
/// <reference path="../../typings/jquery.d.ts"/>
export class FacebookScriptMain {
    static getExtensionID():string {
        return this.extensionID;
    }
    static setCurrentUser(currentUser : FacebookUser){
        FacebookScriptMain.currentUser = currentUser;
    }
    static getCurrentUser() : FacebookUser{
        return FacebookScriptMain.currentUser;
    }
    private static currentUser:FacebookUser;
    private static extensionID:string = "acpkbohefhcjnfckcppfnlkcnhomblld";

    /**
     * listenerConversationList : Method
     * @param null
     * @return null
     *
     */
    private static listenerConversationList():void{
        var allConversationsLink = document.querySelectorAll("._k_");
        if (allConversationsLink.length > 0) {
            for (let i = 0; i < allConversationsLink.length; i++) {
                let conversationLink = allConversationsLink.item(i);
                conversationLink.addEventListener("click", (event) => {
                    let conversationHref:String = conversationLink.getAttribute("href");
                    let identifiant:any = conversationHref.substring(34 ,conversationHref.length);
                    FacebookScriptMain.setCurrentUser(new FacebookUser(identifiant));
                    /**
                     * 1 - On détecte l'identnifiant Facebook du Membre (number/String)
                     * 2 - Si une conversation est en cours avec ce membre alors :
                     *** Là il faut modifier toute la page
                     * *   1 - Penser à modifier le textarea
                     * *   2 - Si le textarea contient déjà des données on les retranscrit directement dans notre nouveau Textarea
                     * *   3 - Creation de l'évenement "onKeyUP sur le keyCode 13 (Enter)
                     * **/
                });
            }
        } else {
            throw new Error("The links of all your conversation are not findable");
        }
    }
    private static listenerConversationMessage():void{
        var conversationDiv:Element = document.querySelector("#webMessengerRecentMessages");
        conversationDiv.addEventListener("DOMSubtreeModified", (event) => {
            // Detection de l'ensemble des messages présent
            FacebookMessage.readAndDecrypt();
        })

    }
    public static launch():void{
        FacebookScriptMain.listenerConversationList();
        FacebookScriptMain.listenerConversationMessage();
    }
}
FacebookScriptMain.launch();