// import { makeApplicationCreateTxnFromObject,OnApplicationComplete, waitForConfirmation,
//    encodeUint64, getApplicationAddress, makeApplicationNoOpTxn, } from "algosdk";
const { makeApplicationCreateTxnFromObject,OnApplicationComplete, waitForConfirmation,
  encodeUint64, getApplicationAddress, makeApplicationNoOpTxn} = require('algosdk')
const algosdk = require('algosdk')   
const fs = require("fs");
require('dotenv').config({path: '../../.env'})

 // Connect your client
 const algodToken = {"X-API-Key": process.env.API_KEY}
 const algodServer = process.env.ALGOD_SERVER
 const algodPort = process.env.PORT
 let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

 const account = algosdk.mnemonicToSecretKey(process.env.SENDER)
 const user = account.addr

const deploy = async () => {
  const suggestedParams = await algodClient.getTransactionParams().do();

  const app = fs.readFileSync(("./approval.teal"), "utf8");
  const compileApp = await algodClient.compile(app).do();

  const clearState = fs.readFileSync(("./clear_state.teal"), "utf8");
  const compiledClearProg = await algodClient.compile(clearState).do();

  const tx = makeApplicationCreateTxnFromObject({
    suggestedParams,
    from: account.addr,
    approvalProgram: new Uint8Array(Buffer.from(compileApp.result, "base64")),
    clearProgram: new Uint8Array(Buffer.from(compiledClearProg.result, "base64")),
    numGlobalByteSlices: 0,
    numGlobalInts: 0,
    numLocalByteSlices: 0,
    numLocalInts: 0,
    onComplete: OnApplicationComplete.NoOpOC,
  });

  let txSigned = tx.signTxn(account.sk);
  const { txId } = await algodClient.sendRawTransaction(txSigned).do();
  const transactionResponse = await waitForConfirmation(algodClient, txId, 5);
  const appId = transactionResponse["application-index"];
  
  console.log("Created app-id: ", appId);

  return appId
}

const deposit = async (appId) => {

// get transaction params
const params = await algodClient.getTransactionParams().do();
// deposit
const enc = new TextEncoder();
const depositAmount = 2000000; //2 Algo

let txn = makeApplicationNoOpTxn(
  account.addr,
  { ...params, flatFee: true, fee: 2000 }, // must pay for inner transaction
  appId,
  [enc.encode("deposit"), encodeUint64(depositAmount)],
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  getApplicationAddress(appId), // rekey to application address
);

// let txId = await waitForConfirmation(txn, account.sk);

let txId = txn.txID().toString();
// Sign the transaction
let signedTxn = txn.signTxn(account.sk);
console.log("Signed transaction with txID: %s", txId);

// Submit the transaction
await algodClient.sendRawTransaction(signedTxn).do()                           
    // Wait for transaction to be confirmed
   const confirmedTxn = await waitForConfirmation(algodClient, txId, 4);
    console.log("confirmed" + confirmedTxn)

    //Get the completed Transaction
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

// display results
let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
console.log("Called app-id:",transactionResponse['txn']['txn']['apid'])
if (transactionResponse['global-state-delta'] !== undefined ) {
  console.log("Global State updated:",transactionResponse['global-state-delta']);
}
if (transactionResponse['local-state-delta'] !== undefined ) {
  console.log("Local State updated:",transactionResponse['local-state-delta']);
}

console.log("Deposit transaction id: " + txId);
}

const main = async () =>{
  var appId = await deploy()
  await deposit(appId);
};

main()