import {FacebookScriptMain} from "./FacebookScriptMain";
import {FacebookUser} from "./FacebookUser";
export class FacebookMessage {

    public static readAndDecrypt() {
        let allMessageElement:NodeList = document.querySelectorAll("div._38.direction_ltr p");
        for (var i:number = 0; i < allMessageElement.length; i++) {
            let messageElement:Node = allMessageElement[i];
            FacebookMessage.uncrypt(messageElement);
        }

        /*var messageText:string = messageElement.innerText;
         var messageObject = JSON.parse(messageText);
         if (!FacebookMessage.isFacebookMessage(messageObject)) {
         throw new Error("The message is not a Facebook crypted Message");
         }
         var cryptedMessage = messageObject.cryptedMessage;
         var senderPublicKey = messageObject.cryptedMessage;*/
        //FacebookMessage.uncryptMessage(cryptedMessage, senderPublicKey);
    }

    private static uncrypt(messageElement:Node){
        let cryptedMessage:String = messageElement.textContent;
        if (FacebookMessage.isFacebookMessage(cryptedMessage)) {
            console.log("-----------------------------------------");
            console.log(cryptedMessage);
            let user:FacebookUser = FacebookScriptMain.getCurrentUser();
            user.uncrypt(cryptedMessage, (response) => {
                if(response.hasOwnProperty("error")){

                }else if(response.hasOwnProperty("uncryptedMessage")){
                    messageElement.textContent = response.uncryptedMessage;
                }
            });
            console.log("-----------------------------------------");
        }
    }
    //TODO isFacebookMessage methode
    private static isFacebookMessage(messageObject:String):Boolean {
        return true;
    }
}