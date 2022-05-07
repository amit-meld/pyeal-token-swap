import { Form, Button, Dropdown } from 'react-bootstrap'
import {StyleSheet, css} from 'aphrodite'
import swap from  '../images/swap.png'
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

export default function SwapCard() {
  const [selected, setselected] = useState(false)
  const [tokenA, setTokenA] = useState(0)
  const [tokenB, setTokenB] = useState(0)
  const [balance, setBalance] = useState(0)
  const [tokenABal, tokenBBal] = useState(0)
  return (
  <div>
    <h2 className={css(styles.title)}>Swap Tokens</h2>
    <div className={css(styles.wrapper)}>
      <Form>
      <div className={css(styles.labelContainer)}>
          <label className={css(styles.textLabel)}>You Send</label>
          <label className={css(styles.textLabel)}>Balance: 5 Algo</label>
        </div>
        <div className={css(styles.inputContainer)}>
          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Control className={css(styles.inputForm)} value={tokenA} onChange={(e) => setTokenA(e.target.value)} type="dropdown" placeholder="Amount" />
          </Form.Group>
          <Dropdown className={css(styles.dropdownInput)} >
            <Dropdown.Toggle variant="success" id="dropdown-basic" className={css(styles.dropdownToggle)} >
              Select token
            </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Alice Token</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Bob Token</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
          <div className={css(styles.labelBottom)}>
            <label className={css(styles.textLabel)}>Wallet: 10,000</label>
            <Button className={css(styles.maxButton)}>Max</Button>
          </div>

        <div className={css(styles.swapImageContainer)}>
          <img src={swap} alt='swap' width='48px' height='48px' />
        </div>

        <label className={css(styles.textLabel)}>You Get</label>  
        <div className={css(styles.inputContainer)}>
          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Control className={css(styles.inputForm)} value={tokenB} onChange={(e) => setTokenB(e.target.value)}  type="dropdown" placeholder="Amount" />
          </Form.Group>
          <Dropdown className={css(styles.dropdownInput)} >
            <Dropdown.Toggle variant="success" id="dropdown-basic" className={css(styles.dropdownToggle)} >
              Select token
            </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Alice Token</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Bob Token</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
          <div className={css(styles.labelBottom)}>
            <label className={css(styles.textLabel)}>Wallet: 10,000</label>
            <Button className={css(styles.maxButton)}>Max</Button>
          </div>
     
        <Button className={css(styles.swapButton)} variant="primary" type="submit">
          Swap Now
        </Button>
      </Form>
    </div>
  </div>  
  )
}
