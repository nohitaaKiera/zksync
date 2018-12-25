const ethers = require("ethers");
const path = require("path");
const fs = require("fs");
const abi_string = fs.readFileSync(path.resolve(__dirname, "../bin/contracts_PlasmaTester_sol_PlasmaTester.abi"), 'UTF-8');
const assert = require("assert");
const transactionLib = require("../lib/transaction");
const ethUtils = require("ethereumjs-util");
const BN = require("bn.js");
const axios = require("axios");

const BATCH_SIZE = 8;

const from = 2;
const to = 3;
const privateKey = new BN("27f703eb6f356a0457255559fecbbde0a79fd2aa370f58dc713d47e58470692", 16);
const startingNonce = 8;
const good_until_block = 100;
const amount = 100;
const fee = 0;

const endpoint = "http://127.0.0.1:8080/send"

async function sendTX() {
    for (let i = 0; i < BATCH_SIZE; i ++) {
        const apiForm = transactionLib.createTransaction(from, to, amount, fee, startingNonce + i, good_until_block, privateKey);
        console.log(JSON.stringify(apiForm));
        const result = await axios({
            method: 'post',
            url: endpoint,
            data: apiForm
        });
        console.log(JSON.stringify(result.data));
    }
    
}

async function run() {
    await sendTX();
}

run().then()