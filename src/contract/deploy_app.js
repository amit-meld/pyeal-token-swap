require('dotenv').config({path: '../../.env'})
const algosdk = require('algosdk');
const { getApplicationAddress } = require('algosdk');
const fs = require("fs");
// const { USDC_ID, GO_USD, BASE_SERVER, PORT, TOKEN } = require('./constants')

async function compileProgram(algodClient, programSource) {
  const file = fs.readFileSync((programSource), "utf8");
  const compile = await algodClient.compile(file).do();
  const compiledBytes = new Uint8Array(Buffer.from(compile.result, "base64"))
  return compiledBytes
}

async function deployApp(){
    try {
        const token = {"X-API-Key": process.env.API_KEY}
        const base_server = process.env.ALGOD_SERVER
        const port = process.env.PORT
        const algodClient = new algosdk.Algodv2(token, base_server, port);
        const params = await algodClient.getTransactionParams().do();

        const mnemonic = process.env.CONTRACTACCOUNT
        const deployer_sk = algosdk.mnemonicToSecretKey(mnemonic);
        const deployer_addr = deployer_sk.addr;

        const approvalProgram = await compileProgram(algodClient, "./approval.teal")
        const clearProgram = await compileProgram(algodClient, "./clear_state.teal")

        const onComplete = algosdk.OnApplicationComplete.NoOpOC;

        const localInts = 0;
        const localBytes = 0;
        const globalInts = 8;
        const globalBytes = 8;

        const accounts = undefined;
        const foreignApps = undefined;
        const foreignAssets = [ 95523624,95523752 ]; //First value is wNGN token & Second is wGHC for testing purposes..

        const appArgs = undefined;
    
        const deployContract = algosdk.makeApplicationCreateTxn(
          deployer_addr,
          params,
          onComplete,
          approvalProgram,
          clearProgram,
          localInts,
          localBytes,
          globalInts,
          globalBytes,
          appArgs,
          accounts,
          foreignApps,
          foreignAssets);

        const signedTxn = deployContract.signTxn(deployer_sk.sk);
       
        // Submit the transaction
        const tx = (await algodClient.sendRawTransaction(signedTxn).do());

        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        const transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
        const appId = transactionResponse['application-index'];

        // Get App Address 
        let contract_addr =  getApplicationAddress(appId)
        console.log(contract_addr)
        
        //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        console.log("The application ID is: " + appId)

    }
    catch (err) {
        console.log("err",err);
    }
    process.exit()
};

module.exports = deployApp
// deploy();

//App ID 95565400
// App Address YPZN4P44O2ZDDTQVOU6HV7JBTFGANXKDHEYNENY6YZ23V6XOWYU6AFNR7I

// using contractAccount
// App addresss 3XNLYKVWZOPLQXUCMLTGEFSJZA5VMERB3SWVT53E6XJE44NN2RWQVRPFXI
//App ID 95575912


// app Address OVXGJ6ICSM5646HVJPYCCBY7TKEE5XDZXUMEHLDWTJ3C3NMOMHDAVOG5NM
// app id 95580936
