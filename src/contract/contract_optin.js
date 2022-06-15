require('dotenv').config({path: '../../.env'})
const algosdk = require('algosdk');
// const EncodeBytes = require('./utils')
const {APPID} = require("../constants")

function EncodeBytes(utf8String) {
  let enc = new TextEncoder()
  return enc.encode(utf8String)
}
async function initialise() {

    try {
      const token = {"X-API-Key": process.env.API_KEY}
      const base_server = process.env.ALGOD_SERVER
      const port = process.env.PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port);
        let params = await algodClient.getTransactionParams().do();

        const mnemonic = process.env.CONTRACTACCOUNT
        let deployer_sk = algosdk.mnemonicToSecretKey(mnemonic);
        let deployer_addr = deployer_sk.addr;
        
        let accounts = undefined;
        let foreignApps = undefined;
        let foreignAssets =[ 95523624,95523752 ];
        let appID = APPID //update

        let appArgs = [];
        appArgs.push(EncodeBytes("contract_optin"));

        
        let callContract = algosdk.makeApplicationNoOpTxn(
            deployer_addr, 
            params, 
            appID, 
            appArgs, 
            accounts, 
            foreignApps, 
            foreignAssets);
        let signedTxn = callContract.signTxn(deployer_sk.sk);
       
        // Submit the transaction
        let tx = (await algodClient.sendRawTransaction(signedTxn).do());

        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        let transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
        console.log("Called app-id:",transactionResponse['txn']['txn']['apid'])
         //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        if (transactionResponse['global-state-delta'] !== undefined ) {
            console.log("Global State updated:",transactionResponse['global-state-delta']);
        }
        if (transactionResponse['local-state-delta'] !== undefined ) {
            console.log("Local State updated:",transactionResponse['local-state-delta']);
        }
 
    }
    catch (err) {
        console.log("err", err);
    }
    process.exit();
};

initialise();