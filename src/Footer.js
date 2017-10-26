import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Linking } from 'react-native'
import appStyles from './styles'

const debounce = require('lodash.debounce')
const style = StyleSheet.create({
  footer: {
    backgroundColor: appStyles.color.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    height: 64
  },
  footerText: {
    padding: 2,
    fontSize: 14
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.screenProps.rootNavigation
  }
  onFooterPress() {
    console.log('Footer pressed')
    Linking.openURL(API.URL.PRICE_HISTORICAL)
      .catch(err => console.error('An error occurred', err))
  }
  render() {
    const mainState = this.props.screenProps.mainState
    return (
      <View style={style.footer}>
        <TouchableHighlight underlayColor='transparent' onPress={this.onFooterPress.bind(this)}>
          <View>
            <Text style={style.footerText}>
              <Text style={style.bold}>1</Text> ETH @ <Text style={style.bold}>{mainState.stats.ethusd}</Text> USD
            </Text>
            <Text style={style.footerText}>
              <Text style={style.bold}>1</Text> ETH @ <Text style={style.bold}>{mainState.stats.ethbtc}</Text> BTC
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
