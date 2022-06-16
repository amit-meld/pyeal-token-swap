import { Form, Button, Dropdown } from 'react-bootstrap'
import {StyleSheet, css} from 'aphrodite'
import swap from  '../images/swap.png'
import { useState, useRef } from 'react'
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
  inputForm: {
    width: '100%',
    backgroundColor: '#19434E',
    borderColor: '#19434E',
    color: 'white',
    '@media (max-width: 768px)': {
      width: '100%',
      margin: 'auto',
    }
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  },
  dropdownInput: {
    // width: '50%',
    margin: '0',
  },
  dropdownToggle: {
    backgroundColor: '#19434E',
    borderColor: '#19434E'
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
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  labelBottom: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  maxButton: {
    backgroundColor: '#E5B50B',
    borderColor: '#E5B50B',
    padding: '4px',
    borderRadius: '5px',
    color: 'black',
    fontSize: '12px',
    marginLeft: '5px'
  }

})

export default function SwapCard() {
  const [amount, setAmount] = useState(0)
  const [ selected, setSelected] = useState("Select token")
  const [receiveToken, setReceiveToken] = useState("Select")
  const userAccount = useRef()
  // const [ token, setToken] = useState(null)

  const handleAmount = (e) =>{
    setAmount(e.target.value)
  }
  const handleDropDown = (e) => {
    setSelected(e.target.value)
  }

  const handleReceiveDropDown = (e) => {
      // setReceiveToken(e.target.value)
    if(selected === e.target.value){
      setReceiveToken("wGHC")
    }else if(selected === e.target.value){
      setReceiveToken("wNGN")
    }else if(receiveToken === "wNGN"){
      setSelected("wGHC")
    }else if(receiveToken === "wGHC"){
      setSelected("wNGN")
    }
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
        handleDropdownChange={handleReceiveDropDown} 
        dropdownValue = {receiveToken}
        // state ={true}
        dropdownID = "tokenB"
        />
        <Button className={css(styles.swapButton)} variant="primary" type="submit" onClick={handleSwap}>
          Swap Now
        </Button>
        <p className={css(styles.textLabel)}>Optin to wNGN (95523624) and wGHC (95523752)</p>
      </div>
    </div>
  </div>  
  )
}

// dropdownValue = {selected == "wNGN" ? "wGHC" : "wNGC"