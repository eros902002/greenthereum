import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Main from './src/Main'
import Welcome from './src/Welcome'
import AddAddress from './src/AddAddress'
import Details from './src/Details'


const screens = {
  Home: { screen: Main },
  Add: { screen: AddAddress },
  Details: { screen: Details }
}
// init router
const Greenthereum = StackNavigator(screens)

export default class App extends React.Component {
  render() {
    return <Greenthereum />
  }
}
