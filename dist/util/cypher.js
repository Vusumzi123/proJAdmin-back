"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Cypher {
    constructor() {
        this.algorithm = process.env.CYPHER_METHOD || 'aes-256-ctr';
        this.password = process.env.CYPHER_PWD || 'admin';
    }
    /**
     * encrypt text
     * */
    encrypt(text) {
        var cipher = crypto_1.createCipher(this.algorithm, this.password);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    decrypt(text) {
        var decipher = crypto_1.createDecipher(this.algorithm, this.password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
}
exports.Cypher = Cypher;
