import React from 'react'
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import appStyles from './styles'

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: appStyles.color.primary[900],
    alignItems: 'center',
    justifyContent: 'center',
    height: 96,
    paddingTop: 10
  },
  headerText: {
    paddingLeft: 5,
    paddingBottom: 32,
    paddingTop: 32,
    fontSize: 20,
    color: 'white'
  }
})
const defaultImg = require('../assets/img/eth2.png')

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.screenProps.rootNavigation
  }
  onPressHeader() {
    console.log('Header pressed')
    this.navigation.goBack()
  }
  render() {
    return (
      <View style={style.header}>
        <TouchableHighlight underlayColor='transparent' onPress={this.onPressHeader.bind(this)}>
          <Text style={style.headerText}>Greenthereum</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
