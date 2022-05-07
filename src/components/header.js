import { useState } from 'react';
import { Button } from 'react-bootstrap'
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

  return(
    <div>
      <div className={css(styles.wrapper)}>
      <h4 className={css(styles.title)}>OneSwap</h4>
        <Button className={css(styles.connectbtn)} onClick= {() => setWallet(!wallet)}>Connect Wallet</Button>
        <ConnectWallet show={wallet} onHide={() => setWallet(false)}/>
      </div>
    </div>
    
  )
}