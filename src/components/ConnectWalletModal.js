/*global AlgoSigner*/
import React, {useRef} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  title: {
    color: '#163E48'
  },
  connectBtn: {
    backgroundColor: 'white',
    width: '90%',
    color: '#163E48',
    padding: '16px',
    fontWeight: 'bold',
    borderColor: '#163E48',
    margin: '10px 20px'
  },
  modal: {
    '@media (max-width: 575px)': {
      width: '90%',
      margin: '10px',
    }
  }
})

export default function ConnectWallet(props) {
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
    // console.log(userAccount.current[0]['address'])
    console.log(userAccount.current)
 }

  return(
    <div>
       <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered className={css(styles.modal)}>
        <Modal.Header closeButton>
          <Modal.Title className={css(styles.title)}>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className={css(styles.connectBtn)} onClick={connectWithAlgoSigner}>AlgoSigner</Button>
          <Button className={css(styles.connectBtn)}>MyAlgo Wallet</Button>
          <Button className={css(styles.connectBtn)}>Pera Wallet </Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}