const crypto = require('crypto');

class Block {


    constructor(previousHash, transactions) {
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.nonce = 0;
        this.timestamp = Date.now();
        this.blockHash = this.calculateHash();
    }


    get previousHash() {
        return this._previousHash;
    }

    get transactions() {
        return this._transactions;
    }

    get blockHash() {
        return this._blockHash;
    }

    set previousHash(value) {
        this._previousHash = value;
    }

    set transactions(value) {
        this._transactions = value;
    }

    set blockHash(value) {
        this._blockHash = value;
    }

}


Block.prototype.calculateHash = function calculateHash() {
    const secret = 'blockchain';
    return crypto.createHmac('sha256', secret)
        .update(JSON.stringify({ transactionsHash: this.transactionsHash, previousHash: this.previousHash, timestamp: this.timestamp }))
        .digest('hex');
};


Block.prototype.miningBlock = function miningBlock(diffculty) {
    let array = new Array(diffculty);
    array.fill(0, 0, diffculty);
    let target = array.toString().replace(/,/g, "");
    console.log("In mining with target", target);
    while (!(this.blockHash.substring(0, diffculty) == target)) {
        this.nonce++;
        this.blockHash = this.calculateHash();
    }
    console.log("Block Mined!!", this.blockHash);
};


module.exports = { Block };