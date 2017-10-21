import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import Warning from './Warning'
import List from './List'
import Header from './Header'
import appStyles from './styles'

const styles = StyleSheet.create({
  addWallet: {
    alignSelf: 'flex-end',
    padding: 20
  },
  addButton: {
    width: 64,
    height: 64
  },
  warning: {
    padding: 20
  }
})

export default class Welcome extends React.Component {
  onPressaddButton() {
    console.log('pressed')
  }
  render() {
    const addButton = require('../assets/img/plus.png')
    return (
      <View>
        <Header></Header>
        <View style={styles.addWallet}>
          <TouchableHighlight underlayColor='transparent' onPress={this.onPressaddButton}>
            <Image style={styles.addButton} source={addButton}></Image>
         </TouchableHighlight>
        </View>
          <Warning customStyles={styles.warning} msg='Please add some wallets'></Warning>
      </View>
    )
  }
}
