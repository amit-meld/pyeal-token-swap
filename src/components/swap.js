/*global AlgoSigner*/
import algosdk from 'algosdk';
const {APPID, CONTRACT_ADDRESS} = require("../constants")

function EncodeBytes(utf8String) {
  let enc = new TextEncoder()
  return enc.encode(utf8String)
}

export default async function Swap(assetId, foreignAssedId, tokenArg, amt, userAccount) {

    await AlgoSigner.connect();
    userAccount.current =  await AlgoSigner.accounts({
        ledger: 'TestNet'
      })
   
    try {
 
      const token = {"X-API-Key": process.env.REACT_APP_API_KEY}
      const base_server = process.env.REACT_APP_ALGOD_SERVER
      const port = process.env.REACT_APP_PORT
      const algodClient = new algosdk.Algodv2(token, base_server, port)

      const params = await algodClient.getTransactionParams().do();
      const accounts = undefined;
      const foreignApps = undefined;
      const foreignAssets =[foreignAssedId];
      const closeRemainderTo = undefined;
      const revocationTarget = undefined;
      const note = undefined;
      const amount = amt;

      const appArgs = [];
      appArgs.push(EncodeBytes(tokenArg));

        const transferASA = algosdk.makeAssetTransferTxnWithSuggestedParams(
            userAccount.current[0].address,
            CONTRACT_ADDRESS,
            closeRemainderTo,
            revocationTarget,
            +amount,
            note,
            assetId,
            params,
        );

        const appCall = algosdk.makeApplicationNoOpTxn(
            userAccount.current[0].address,
            params,
            APPID,
            appArgs,
            accounts,
            foreignApps,
            foreignAssets
        );

        algosdk.assignGroupID([transferASA, appCall]);

        const binaryTxs = [transferASA.toByte(), appCall.toByte()];
        const base64Txs = binaryTxs.map((binary) => AlgoSigner.encoding.msgpackToBase64(binary));

        const signedTxs = await AlgoSigner.signTxn([
        {
            txn: base64Txs[0],
        },
        {
            txn: base64Txs[1],
        },
        ]);
        // The signed transaction array can then be sent using the SDK.

        const binarySignedTxs = signedTxs.map((tx) => AlgoSigner.encoding.base64ToMsgpack(tx.blob));
        const id = await algodClient.sendRawTransaction(binarySignedTxs).do();
        console.log(id)
    }
    catch (err) {
        console.log("err", err);
    }
};
