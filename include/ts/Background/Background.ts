/************************************
 *    ALL ELEMENT TO INCLUDE         *
 ************************************/
var openpgp = require("openpgp");

/************************************
 *    ALL REFERENCES FOR Typings    *
 ************************************/
/// <reference path="../../typings/chrome.d.ts" />
/// <reference path="../../typings/jquery.d.ts" />
/// <reference path="../../typings/openpgp.d.ts" />

export class Background {
    private me : People;

    constructor() {
        this.me = new People();
        this.me.initialize("Bonjour", -1);
        setTimeout(()=>{console.log(this.me)}, 1000*20);
    }
}
class People {
    private passPhrase : string;
    private publicKey : string;
    private privateKey : string;
    private timeDeletingPassPhrase : number; // if (=-1 never) (=0 Always) (>0 secondTime)

    public initialize(passPhrase : string, timeDeletingPassPhrase : number){
        this.passPhrase = passPhrase;
        this.timeDeletingPassPhrase = timeDeletingPassPhrase;
        openpgp.generateKey({
            userIds: [{ name:'FBCrypter', email:'Crypted@mail.com' }],
            numBits: 1024,                       // RSA key size
            passphrase: this.passPhrase         // protects the private key
        }).then( (key) => {
            this.privateKey = key.privateKeyArmored;
            this.publicKey = key.publicKeyArmored;
        });
    }
}