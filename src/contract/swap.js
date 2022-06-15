require('dotenv').config({path: '../../.env'});
const algosdk = require('algosdk');
// const EncodeBytes = require('../utils');
// const {APPID, CONTRACT_ADDRESS} = require( '../constants');
const {APPID, CONTRACT_ADDRESS} = require("../constants")

function EncodeBytes(utf8String) {
  let enc = new TextEncoder()
  return enc.encode(utf8String)
}
async function Swap(assetId, foreignAssedId, tokenArg) {

    try {
 
      const token = {"X-API-Key": process.env.API_KEY}
      const base_server = process.env.ALGOD_SERVER
      const port = process.env.PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port)
      const params = await algodClient.getTransactionParams().do();

      const mnemonic = process.env.USERACCOUNT
      const user_sk = algosdk.mnemonicToSecretKey(mnemonic);
      const user_addr = user_sk.addr;
      
      const accounts = undefined;
      const foreignApps = undefined;
      const foreignAssets =[foreignAssedId];
      const closeRemainderTo = undefined;
      const revocationTarget = undefined;
      const note = undefined;
      const amount = 10;
      // const CONTRACT_ADDRESS = CONTRACT_ADDRESS
      // const APPID = APPID

      const appArgs = [];
      appArgs.push(EncodeBytes(tokenArg));

        let transferASA = algosdk.makeAssetTransferTxnWithSuggestedParams(
            user_addr,
            CONTRACT_ADDRESS,
            closeRemainderTo,
            revocationTarget,
            amount,
            note,
            assetId,
            params,
        );

        let callContract = algosdk.makeApplicationNoOpTxn(
            user_addr,
            params,
            APPID,
            appArgs,
            accounts,
            foreignApps,
            foreignAssets
        );


        const atomictxn = [transferASA, callContract];
        const txgroup = algosdk.assignGroupID(atomictxn);

        const signedTxn1 = transferASA.signTxn(user_sk.sk);
        const signedTxn2 = callContract.signTxn(user_sk.sk);

        let signed = [];
        signed.push(signedTxn1);
        signed.push(signedTxn2);
       
        // Submit the transaction
        const tx = (await algodClient.sendRawTransaction(signed).do());

        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        const transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
        const appId = transactionResponse['application-index'];

        //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
 
    }
    catch (err) {
        console.log("err", err);
    }
    process.exit();
};

module.exports = Swap;
