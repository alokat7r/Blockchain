const { Block } = require('./class/Block');
const express = require('express');
var app = express();

// view engine setup

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const blockArray = [];

let transactions1 = ["i am a bad man 1", "I love blockchain 1"];
let block1 = new Block(0, transactions1);
blockArray.push(block1);
console.log("Mining started...1", block1.blockHash);
block1.miningBlock(1);

let transactions2 = ["i am a bad man 2", "I love blockchain 2"];
let block2 = new Block(block1.blockHash, transactions2);
blockArray.push(block2);
console.log("Mining started...2", block2.blockHash);
block2.miningBlock(1);

let transactions3 = ["i am a bad man 3", "I love blockchain 3"];
let block3 = new Block(block2.blockHash, transactions3);
blockArray.push(block3);
console.log("Mining started...3", block3.blockHash);
block3.miningBlock(1);

let transactions4 = ["i am a bad man 4", "I love blockchain 4"];
let block4 = new Block(block3.blockHash, transactions4);
blockArray.push(block4);
console.log("Mining started...4", block4.blockHash);
block4.miningBlock(1);

let isValid = isValidChain(1);
console.log("IsValid", isValid);


console.log("Final Chain", (blockArray));


function isValidChain(diffculty) {
    let array = new Array(diffculty);
    array.fill(0, 0, diffculty);
    let target = array.toString().replace(/,/g, "");
    let currentBlock, previousBlock;
    for (let index = 1; index < blockArray.length; index++) {
        currentBlock = blockArray[index];
        previousBlock = blockArray[index - 1];

        if (!(currentBlock.blockHash == currentBlock.calculateHash())) {
            return false;
        }

        if (!(previousBlock.blockHash == currentBlock.previousHash)) {
            return false;
        }

        if (!(currentBlock.blockHash.substring(0, diffculty) == target)) {
            return false;
        }

    }
    return true;
}

module.exports = app;