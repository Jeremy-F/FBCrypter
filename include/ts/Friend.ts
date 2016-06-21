/**
 * Created by Jerem on 05/06/2016.
 */
export class Friend{
    private _fbIdent : string;
    private _publicKey : string;


    constructor(fbIdent:string, publicKey:string) {
        this._fbIdent = fbIdent;
        this._publicKey = publicKey;
    }
    
    get fbIdent():string {
        return this._fbIdent;
    }

    get publicKey():string {
        return this._publicKey;
    }
    
}