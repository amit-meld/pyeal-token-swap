const algosdk = require('algosdk')   
require('dotenv').config({path: '../../.env'})

 // Connect your client
 const algodToken = {"X-API-Key": process.env.API_KEY}
 const algodServer = process.env.ALGOD_SERVER
 const algodPort = process.env.PORT
 let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

 const account = algosdk.mnemonicToSecretKey(process.env.SENDER)

 const createAsset = async ( asset_name, unit_name) => {

    let params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let note = undefined;
    let creator = account.addr;
    let defaultFrozen = false;
    let decimals = 0;
    let total = 1000000000;
    let unitName = unit_name;
    let assetName = asset_name;
    let assetURL = undefined;
    //  Optional hash commitment of some sort relating to the asset. 32 character length.
    let assetMetadataHash = undefined;
    let manager = account.addr;
    let reserve = account.addr;
    let freeze = account.addr;   
    let clawback = account.addr;

    // signing and sending "txn" allows "addr" to create an asset
    let txn =  algosdk.makeAssetCreateTxnWithSuggestedParams(
      creator, 
      note,
      total, 
      decimals, 
      defaultFrozen, 
      manager, 
      reserve, 
      freeze,
      clawback, 
      unitName, 
      assetName, 
      assetURL, 
      assetMetadataHash, 
      params);

        // Sign the transaction
        let signedTxn = txn.signTxn(account.sk);
        let txId = txn.txID().toString();

        // Submit the transaction
        await algodClient.sendRawTransaction(signedTxn).do();

        // Wait for confirmation
        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);      
}

createAsset("wGHC", "wGHC")
