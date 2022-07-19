import { Form, Button, Dropdown } from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite'
import swap from  '../images/swap.png'
import { useState, useRef, useEffect } from 'react'
import SwapForm from './swapForm'
import Swap from './swap'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: '50px',
    width: '35%',
    backgroundColor: '#0B262C',
    borderRadius: '16px',
    '@media (max-width: 768px)': {
      width: '80%',
      margin: 'auto',
    }
  },
  title: {
    textAlign: 'center',
    color: 'white'
  },
  swapButton: {
    width: '100%',
    backgroundColor: '#5FCA74',
    borderColor: '#5FCA74',
    marginTop: '20px',
    padding: '16px' 
  },
  swapImageContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  textLabel: {
    color: 'white',
    marginTop: '16px'
  },
})

export default function SwapCard() {
  const [amount, setAmount] = useState(0)
  const [ selected, setSelected] = useState("Select token")
  const [receiveToken, setReceiveToken] = useState("Select")
  const [showId, setShowId] = useState(false)
  const [txid, setTxId] = useState("")

  const userAccount = useRef()

  const handleAmount = (e) =>{
    setAmount(e.target.value)
  }
  const handleDropDown = (e) => {
    setSelected(e.target.value)
  }

  const switchAsset = () => {
    selected === "wNGN" ? setReceiveToken("wGHC") : setReceiveToken("wNGN")
  }

 const handleSwap = async () => {
    //Swap wNGN
    if(selected === "wNGN"){
      return await Swap(95523624,95523752, "wNGN", amount, userAccount)
    }else{
       // Swap wGHC
      return await Swap(95523752,95523624, "wGHC", amount, userAccount)
    }  
  }

  const transTxt = () => {
    if (txid) {
      return `'TxId' ${txid.substring(0,15)} '...`
    }
    return ''
  }

  const clearStorage = () => localStorage.clear("txId")


  useEffect(() => {
    switchAsset() 

    const id = localStorage.getItem("txId")
    console.log(id)
    setTxId(id)

    if(txid !== ""){
      setShowId(true)
    }
    
  }, [selected, receiveToken])

  return (
  <div>
    <h2 className={css(styles.title)}>Swap Tokens</h2>
    <div className={css(styles.wrapper)}>
      <div>
        <SwapForm 
          title="You Send"
          handleAmountChange= {handleAmount}
          amountValue= {amount} 
          handleDropdownChange={handleDropDown} 
          dropdownValue = {selected}
          dropdownID = "tokenA"
       />

          <div className={css(styles.swapImageContainer)}>
            <img src={swap} alt='swap' width='48px' height='48px' />
          </div>
        <SwapForm 
        title="You Get"
        handleAmountChange= {handleAmount}
        amountValue= {amount} 
        handleDropdownChange={handleDropDown}
        dropdownValue = {receiveToken}
        // state ={true}
        dropdownID = "tokenB"
        />
        <Button className={css(styles.swapButton)} variant="primary" type="submit" onClick={handleSwap}>
          Swap Now
        </Button>
        <p className={css(styles.textLabel)}>Optin to wNGN (95523624) and wGHC (95523752)</p>
        <a href={`https://testnet.algoexplorer.io/tx/${txid}`} onClick={clearStorage}>{txid ? `${txid.substring(0,15)}...` : ''}</a>
        {/* <a href={`https://testnet.algoexplorer.io/tx/${txid}`} onClick={clearStorage}>{`TxId: ${txid.substring(0,15)}... ` }</a> */}
        {showId}
      </div>
    </div>
  </div>  
  )
}
