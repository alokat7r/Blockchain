const crypto = require('crypto');

class Block {
    constructor(previousHash, transactions) {
        this.previousHash = previousHash;
        this.transactions = transactions;

        const secret = 'blockchain';
        let transactionsString = this.transactions.join('');
        let transactionsHash = crypto.createHmac('sha256', secret)
            .update(transactionsString)
            .digest('hex');

        let hashObject = { transactionsHash: transactionsHash, previousHash: this.previousHash };
        this.blockHash = crypto.createHmac('sha256', secret)
            .update(JSON.stringify(hashObject))
            .digest('hex');
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

module.exports = { Block };