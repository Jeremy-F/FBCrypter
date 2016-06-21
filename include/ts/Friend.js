"use strict";
/**
 * Created by Jerem on 05/06/2016.
 */
var Friend = (function () {
    function Friend(fbIdent, publicKey) {
        this._fbIdent = fbIdent;
        this._publicKey = publicKey;
    }
    Object.defineProperty(Friend.prototype, "fbIdent", {
        get: function () {
            return this._fbIdent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Friend.prototype, "publicKey", {
        get: function () {
            return this._publicKey;
        },
        enumerable: true,
        configurable: true
    });
    return Friend;
}());
exports.Friend = Friend;
//# sourceMappingURL=Friend.js.map