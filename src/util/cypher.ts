import {createCipher, createDecipher} from 'crypto';

export class Cypher{
    private algorithm: string;
    private password: string;
    constructor(){
        this.algorithm = process.env.CYPHER_METHOD || 'aes-256-ctr';
        this.password = process.env.CYPHER_PWD || 'admin';
    }

    /**
     * encrypt text
     * */
    public encrypt(text) {
        var cipher = createCipher(this.algorithm,this.password)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    public decrypt(text){
        var decipher = createDecipher(this.algorithm,this.password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}