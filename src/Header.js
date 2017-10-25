import React from 'react'
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native'

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#e9ffe5',
    alignItems: 'center',
    justifyContent: 'center',
    height: 96,
    paddingTop: 10
  },
  headerImg: {
    width: 48,
    height: 48
  },
  headerText: {
    paddingLeft: 5,
    paddingBottom: 26,
    paddingTop: 26,
    fontSize: 18
  }
})
const defaultImg = require('../assets/img/ethgreen.png')

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
        <Image
          style={style.headerImg}
          source={defaultImg}>
        </Image>
        <TouchableHighlight underlayColor='transparent' onPress={this.onPressHeader.bind(this)}>
          <Text style={style.headerText}>Greenthereum</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
