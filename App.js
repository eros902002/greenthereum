import React from 'react'
import Main from './src/Main'
import Welcome from './src/Welcome'
import AddAddress from './src/AddAddress'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

const screens = {
  Home: { screen: Main },
  Add: { screen: AddAddress}
}
const opts = {
  headerMode: 'none'
}
// init router
const Greenthereum = StackNavigator(screens , opts)

export default class App extends React.Component {
  render() {
    return <Greenthereum />
  }
}
