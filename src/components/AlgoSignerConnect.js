
const getUserAccount = async () =>{
  userAccount.current =  await AlgoSigner.accounts({
       ledger: 'TestNet'
     })
  // console.log(userAccount.current[0]['address'])
  
  console.log(userAccount.current)
}

export default async function connectWithAlgoSigner () {
  let resp = await AlgoSigner.connect()
      console.log(resp)
      getUserAccount()
}
