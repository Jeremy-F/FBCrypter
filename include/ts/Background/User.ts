
/************************************
 *    ALL REFERENCES FOR Typings    *
 ************************************/
/// <reference path="../../typings/chrome.d.ts" />

var openpgp = require("../../../node_modules/openpgp/dist/openpgp.min");

export class User {
    private passPhrase:string;
    private publicKey:string;
    private privateKey:string;
    private timeDeletingPassPhrase:number;
    private bitEncryption:number;
    private facebookID:number;

    
    constructor(facebookID:number, timeDeletingPassPhrase : number) {
        this.facebookID = facebookID;
        this.timeDeletingPassPhrase = timeDeletingPassPhrase;
    }

    public generateKeyPair(finalMethod:Function, passPhrase: string, bitEncryption:number = 1024) {
        this.bitEncryption = bitEncryption;
        this.passPhrase = passPhrase;
        openpgp.generateKey({
            userIds: [{name: 'FBCrypter', email: 'Crypted@mail.com'}],
            numBits: this.bitEncryption,
            passphrase: this.passPhrase
        }).then((key) => {
            this.privateKey = key.privateKeyArmored;
            this.publicKey = key.publicKeyArmored;
            finalMethod({error:false});
        }).fail((key) => {
            finalMethod({error:true, key:key});
        });
    }
    public setFacebookID(facebookID:number) {
        this.facebookID = facebookID;
    }
}