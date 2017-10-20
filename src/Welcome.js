import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Warning from './Warning'
import List from './List'
import styles from './styles'

const css = StyleSheet.create({
  container: styles.container,
  addWallet: {
    alignSelf: 'flex-end',
    marginTop: 20
  },
  addButton: {
    width: 64,
    height: 64
  }
})

export default class Welcome extends React.Component {
  render() {
    const addButton = require('../assets/img/plus.png')
    return <View style={css.container}>
      <View style={css.addWallet}>
        <Image style={css.addButton} source={addButton}></Image>
      </View>
      <Warning msg='Please add some wallets'></Warning>
    </View>
  }
}
