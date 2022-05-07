import {StyleSheet, css} from 'aphrodite'
import background from '../images/back.svg'
import Header from './header'
import SwapCard from './swapCard'

const styles = StyleSheet.create({
  wrapper: {
    backgroundImage: `url(${background})`,
    height: '100vh'
  },
  title: {
    textAlign: 'center',
    marginTop: '24px',
    color: 'white'
  }
})

export default function Home () {
  return(
    <div className={css(styles.wrapper)}>
      <Header/>
      <SwapCard/>
    </div>
  )
}