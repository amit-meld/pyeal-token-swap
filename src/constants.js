require('dotenv').config({path: '../../.env'});

const APPID = 95634255
const CONTRACT_ADDRESS = "6US7FPCF6FFK4NMN3IDBOOLDBV2HJL3AG2D4ZP5OYYUIFM4UQFBMAWYOGQ"
// const GO_USD = 93977519;
// const USDC_ID = 93977402
// const GOUSD_ARG = "goUSD"
// const USDC_ARG = "USDC"
// const INIT = "INIT"

const TOKEN = {"X-API-Key": process.env.PURESTAKE_API_TOKEN}
const BASE_SERVER = "https://testnet-algorand.api.purestake.io/ps2"
const PORT = "";

module.exports = {
  APPID,
  CONTRACT_ADDRESS,
  // GO_USD,
  // USDC_ID,
  // GOUSD_ARG,
  // USDC_ARG,
  // INIT,
  TOKEN,
  BASE_SERVER,
  PORT,
}