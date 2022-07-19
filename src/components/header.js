/*global AlgoSigner*/
import { useState, useRef, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap'
import {StyleSheet, css} from 'aphrodite'
import ConnectWallet from './ConnectWalletModal';
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px'
  },
  connectbtn: {
    backgroundColor: '#163E48',
    borderColor: 'white',
    color: 'white'
  },
  title: {
    color: 'white',
  }
})

export default function Header () {
  const [wallet, setWallet] = useState(false);
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setAddress] = useState ("")
  const [account, setAccount] = useState("Connect Wallet")
  const userAccount = useRef()
 
  const connectWithAlgoSigner = async () =>{
    let resp = await AlgoSigner.connect()
        console.log(resp)
        getUserAccount()
  }
  const getUserAccount = async () =>{
    userAccount.current =  await AlgoSigner.accounts({
         ledger: 'TestNet'
       })
       setAccount(userAccount.current[0]['address'].substring(0,14) + "...")
    // console.log(userAccount.current[0]['address'])
    console.log(userAccount.current)

 }
   
  useEffect(() =>{
    getUserAccount()
    
    if(account !== undefined){
      setIsConnected(true)
      setAddress(account)
    } else {
      setAddress('connect wallet')
      setIsConnected(false)
    }
    console.log(userAccount.current)
  }, [account])

  return(
    <div>
      <div className={css(styles.wrapper)}>
      <h4 className={css(styles.title)}>OneSwap</h4>
      <div>
        {/* {
          isConnected ? 
//             <Dropdown>
//               <Dropdown.Toggle variant="success" id="dropdown-basic">
//               {`${walletAddress.substring(0,10)}`}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 {isConnected ? <div></div> :                 
//                 <Dropdown.Item onClick= {connectWithAlgoSigner} href="#">Connect Wallet</Dropdown.Item>
//  }
//                 <Dropdown.Item onClick={disconnect} href="#">Disconnect</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>        
          <Button className={css(styles.connectbtn)} onClick= {connectWithAlgoSigner}>{`${walletAddress.substring(0,10)}`}</Button>
          : <Button className={css(styles.connectbtn)} onClick= {connectWithAlgoSigner}>Connect Wallet</Button>
          
        } */}
                  <Button className={css(styles.connectbtn)} onClick= {connectWithAlgoSigner}>{`${walletAddress}`}</Button>

        {/* <ConnectWallet show={wallet} onHide={() => setWallet(false)}/> */}
      </div>     
      </div>
    </div>
    
  )
}