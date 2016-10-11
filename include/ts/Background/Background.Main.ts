///<reference path="../Main.ts"/>
import {User} from "./User";
import {Conversation} from "./Conversation";
import {Tab} from "./Tab";
/************************************
 *    ALL REFERENCES FOR Typings    *
 ************************************/
/// <reference path="../../typings/chrome.d.ts" />
    
var openpgp = require("../../../node_modules/openpgp/dist/openpgp.min");
class BackgroundMain {

    private static user:User;
    private static tabs:Array<Tab>;
    private static conversation:Array<Conversation>;

    private static initializeWebNavigationListener() {
        chrome.webNavigation.onCompleted.addListener((details) => {
            chrome.tabs.executeScript(details.tabId, {
                file: "include/ts/FacebookScript/Facebook.js",
                runAt: "document_end"
            });
        }, {url: [{urlPrefix: "https://www.facebook.com/messages"}]});
    }

    private static initializeController() {
        chrome.runtime.onMessage.addListener(
            (request, sender, sendResponse) => {
                console.log(request);
                if(request.hasOwnProperty("requestType")){
                    if(request.requestType instanceof String){
                        switch (request.requestType){
                            case "initUser":
                                BackgroundMain.initUser(request, sendResponse);
                                break;
                            case "initConversation":
                                BackgroundMain.initConversation(request, sendResponse);
                                break;
                            case "uncryptMessage": //TODO unCryptMessage
                                BackgroundMain.uncryptMessage(request, sendResponse);
                                break;
                        }
                    }else{
                        sendResponse({error:true, sentence:"The request type have not a good type " +
                                                            "(need String, is : "+request.requestType.className});
                    }
                }else{
                    sendResponse({error:true, sentence:"The request Type is not defined"});
                }
            }
        );
    }
    private static initUser(request : any, sendResponse : Function){
        /* We verify */
        let verify = request.hasOwnProperty("facebookID") && request.facebookID instanceof Number
                    && request.hasOwnProperty("timeDeletingPassPhrase") && request.timeDeletingPassPhrase instanceof Number
                    && request.hasOwnProperty("passPhrase") && request.passPhrase instanceof String
                    && request.hasOwnProperty("bitEncryption") && request.bitEncryption instanceof Number
        if(verify){
            let decBitEncryption = request.bitEncryption;
            let bynBitEncryption = decBitEncryption.toString(2);
            bynBitEncryption = Number(2).toString(2);
            if(bynBitEncryption.substr(0, 1) === "1" && parseInt(bynBitEncryption.substr(1, bynBitEncryption.length)) === 0){
                BackgroundMain.user = new User(request.facebookID, request.timeDeletingPassPhrase);
                BackgroundMain.user.generateKeyPair(sendResponse, request.passPhrase, request.bitEncryption);
            }else{
                sendResponse({error:true, sentence:"The bit Encryption number is not a power of two"});
            }
        }else{
            sendResponse({error:true, sentence:"Some properties are not defined"});
        }
    }
    public static launch() {
        this.tabs = new Array<Tab>();

        this.initializeWebNavigationListener();
        this.initializeController();
    }

    private static initConversation(request:any, sendResponse : any) {

    }
}
BackgroundMain.launch();


/************************************
 *    ALL ELEMENT TO INCLUDE         *
 ************************************/
/*var openpgp = require("../../../node_modules/openpgp/dist/openpgp.min");
 openpgp.initWorker({ path:'../../../node_modules/openpgp/dist/openpgp.worker.js' }); // set the relative web worker path
 openpgp.config.aead_protect = true; // activate fast AES-GCM mode (not yet OpenPGP standard)
 /// <reference path="../../typings/openpgp.d.ts" />

 /************************************
 *          INITIALISATION          *
 ************************************
 let ME : People = {
 passPhrase : "",
 publicKey: "",
 privateKey: "",
 timeDeletingPassPhrase: 60*10, // By Default - All Ten Minutes
 };
 /* Asking a passPhrase to Generate privateKey *
 ME.passPhrase = prompt("Enter a passPhrase : ", "");
 openpgp.generateKey({
 userIds: [{ name:'FBCrypter', email:'Crypted@mail.com' }],
 numBits: 1024,                                            // RSA key size
 passphrase: ME.passPhrase         // protects the private key
 }).then( (key) => {
 ME.privateKey = key.privateKeyArmored;
 ME.publicKey = key.publicKeyArmored;
 alert(ME);
 giveMeInfos();
 });

 function giveMeInfos(){
 console.log(ME);
 }

 //*/