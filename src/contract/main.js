const deployApp = require('./deploy_app') 
const Swap = require("./swap")

const main = async () => {
  // await deployApp()
  //Swap wNGN
  await Swap(95523624,95523752, "wNGN")
  // Swap wGHC
  await Swap(95523752,95523624, "wGHC")

}
main()