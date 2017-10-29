import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Linking } from 'react-native'
import Fetching from './Fetching'
import appStyles from './lib/styles'
import {formatCurrency, formatEther} from './lib/utils'

const debounce = require('lodash.debounce')
const style = StyleSheet.create({
  footer: {
    backgroundColor: appStyles.color.primary[100],
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    padding: 2,
    fontSize: 12
  },
  footerSupply: {
    padding: 2,
    fontSize: 10
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.screenProps.rootNavigation
    this.getFooter = this.getFooter.bind(this)
  }
  onFooterPress() {
    console.log('Footer pressed')
    Linking.openURL(API.URL.PRICE_HISTORICAL)
      .catch(err => console.error('An error occurred', err))
  }
  getFooter() {
    const mainState = this.props.screenProps.mainState
    return (
      <TouchableHighlight underlayColor='transparent' onPress={this.onFooterPress.bind(this)}>
        <View>
         { mainState.stats.ethusd ? (
            <View>
             <Text style={style.footerText}>
               1 Ether - {formatCurrency(mainState.stats.ethusd, mainState.currency)}
             </Text>
             <Text style={style.footerText}>
               1 Ether - {mainState.stats.ethbtc} BTC
             </Text>
            </View>
          ) : <Fetching msg='convert rate'></Fetching>
          }
          { mainState.stats.supply ? (
            <Text style={style.footerSupply}>
              Total supply: <Text style={style.bold}>
                {formatEther(mainState.stats.supply)}
              </Text> Ether
            </Text>
          ): <Fetching msg='total supply'></Fetching>
          }
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View style={style.footer}>
        {this.getFooter()}
      </View>
    )
  }
}
