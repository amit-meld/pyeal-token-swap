import { Form, Button, Dropdown } from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite'
import { useState } from 'react'

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
    padding: '16px',
    '@media (max-width: 768px)': {
      width: '100%',
      margin: 'auto',
    }
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    padding: '8px'
  },
  dropdownInput: {
    // width: '50%',
    margin: '0',

  },
  dropdownToggle: {
    backgroundColor: '#19434E',
    borderColor: '#19434E',
    color: 'white',
    borderRadius: '5px',
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
    color: 'white'
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
export default function SwapForm ({title, handleAmountChange, amountValue, handleDropdownChange, dropdownValue, state, dropdownID, test}){

  const options = [
    // { value: 'Select token', label: 'Select token' },
    { value: 'wNGN', label: 'wNGN' },
    { value: 'wGHC', label: 'wGHC' },
  ];
  return(
    <div>
      <Form>
        <div className={css(styles.labelContainer)}>
          <label className={css(styles.textLabel)}>{title}</label>
          {/* <label className={css(styles.textLabel)}>Balance: 5 Algo</label> */}
        </div>
        <div className={css(styles.inputContainer)}>
          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Control disabled ={state} className={css(styles.inputForm)} value={amountValue} onChange={handleAmountChange} type="dropdown" placeholder="Amount" />
          </Form.Group>
              <select disabled= {state} className={css(styles.dropdownToggle)}  id={dropdownID} onChange={handleDropdownChange} value={dropdownValue}>
                  {options.map((item) => <option value={item.value}>{item.label}</option> )}
               </select>     
        </div>
        {/* (e) => setAmount(e.target.value) */}

          {/* <div className={css(styles.labelBottom)}>
            <label className={css(styles.textLabel)}>Wallet: 10,000</label>
            <Button className={css(styles.maxButton)}>Max</Button>
          </div> */}
          </Form>
    </div>
  )
}