import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Linking } from 'react-native'
import API from './api'

const debounce = require('lodash.debounce')
const style = StyleSheet.create({
  footer: {
    backgroundColor: '#c1efb8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    padding: 2,
    fontSize: 12
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: {
        ethbtc: '-',
        ethusd: '-',
        date: null
      }
    }
    this.navigation = this.props.screenProps.rootNavigation
    this.getStats = debounce(this.getStats.bind(this), API.const.MIN_REQUEST_TIME, {
      'leading': true,
      'trailing': false
    })
  }
  componentDidMount() {
    this.getStats()
  }
  getStats() {
    console.log('getStats()')
    API.getStats()
      .then((response) => response.json())
      .then((response) => response.result)
      .then((result) => {
        this.setState({
          stats: {
            ethbtc: result.ethbtc,
            ethusd: result.ethusd,
            date: new Date()
          }
        })
      })
  }
  onFooterPress() {
    console.log('Footer pressed')
    Linking.openURL(API.URL.PRICE_HISTORICAL)
      .catch(err => console.error('An error occurred', err))
  }
  render() {
    return (
      <View style={style.footer}>
        <TouchableHighlight underlayColor='transparent' onPress={this.onFooterPress.bind(this)}>
          <View>
            <Text style={style.footerText}>
              <Text style={style.bold}>1</Text> ETH @ <Text style={style.bold}>{this.state.stats.ethusd}</Text> USD
            </Text>
            <Text style={style.footerText}>
              <Text style={style.bold}>1</Text> ETH @ <Text style={style.bold}>{this.state.stats.ethbtc}</Text> BTC
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
