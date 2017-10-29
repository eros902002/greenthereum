import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native'
import ethUnit from 'ethereum-units'
import List from './List'
import Welcome from './Welcome'
import Footer from './Footer'
import BottomNav from './BottomNav'
import ActivityIndicatorLayer from './ActivityIndicatorLayer'
import {STG_ADDRESSES, STG_STATE} from './lib/constants'
import API from './lib/api'
import appStyles from './lib/styles'

const debounce = require('lodash.debounce')

export default class Main extends React.Component {
  static navigationOptions = {
    headerTitle: 'Greenthereum',
    headerStyle: appStyles.headerStyle,
    headerTitleStyle: appStyles.headerTitleStyle
  }
  constructor(props) {
    super(props)
    this.state = {
      screen: 'Main',
      accounts: [],
      stats: {
        ethbtc: null,
        ethusd: null,
        supply: null
      },
      currency: 'USD',
      cached: false,
      date: null,
      loading: true
    }
    this.navigation = this.props.navigation
    this.getAccounts = this.getAccounts.bind(this)
    this.refresh =this.refresh.bind(this)
    this.fetchData = debounce(this.fetchData.bind(this), API.const.MIN_REQUEST_TIME, {
      'leading': true,
      'trailing': false
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    console.log('getStats()')
    this.setState({
      loading: true
    })
    Promise.all([API.getStats(), this.getAccounts()])
      .then((responses) => {
        return Promise.all([responses[0].json(), responses[1].json()])
      })
      .then((jsons) => {
        const stats = jsons[0].result
        const accounts = jsons[1].result
        const items = accounts.map((account) => {
          const balance = convertBalanceFromWei(account.balance)
          const usdBalance = (balance * Number(stats.ethusd)).toFixed(2)
          return {
            key: account.account,
            balance: balance,
            usd: usdBalance
          }
        })

        this.setState({
          accounts: items,
          loading: false,
          date: new Date(),
          stats: {
            ethbtc: stats.ethbtc,
            ethusd: stats.ethusd
          }
        })
        console.log('update backup (stats, accounts):', JSON.stringify(this.state))
        AsyncStorage.setItem(STG_STATE, JSON.stringify(this.state))
      })
      .then(API.getTotalSupply)
      .then((response) => response.json())
      .then((json) => {
        this.setState((prevState) => ({
          stats: Object.assign(this.state.stats, {
            supply: convertBalanceFromWei(json.result)
          })
        }))
        console.log('update backup (supply):', JSON.stringify(this.state))
        AsyncStorage.setItem(STG_STATE, JSON.stringify(this.state))
      })
      .catch(this.loadBackup.bind(this))
  }

  getAccounts() {
    console.log(`getAccounts() in ${STG_ADDRESSES}`)
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STG_ADDRESSES)
        .then(API.getAccounts)
        .then(resolve)
        .catch(reject)
    })
  }

  loadBackup(err) { // load Backup
    console.log('fetchData ERROR:', err)
    AsyncStorage.getItem(STG_STATE)
      .then(backup => JSON.parse(backup))
      .then((backupState) => {
        console.log(`using backup state from ${backupState.date}`)
        backupState.loading = false
        backupState.cached = true
        this.setState(backupState)
      })
      .catch((err) => {
        console.log('No backup found:', err)
        this.setState({
          loading: false
        })
      })
  }

  removeAddresses() {
    AsyncStorage.removeItem(STG_ADDRESSES)
      .then(() => {
        console.log('all addresses removed')
        this.setState({
          accounts: []
        })
      })
  }
  refresh() {
    console.log('refresh()')
    this.fetchData()
  }
  render() {
    const screenProps = {
      rootNavigation: this.navigation,
      mainState: this.state,
      mainComponent: this
    }
    const content = !this.state.accounts.length ?
      <Welcome screenProps={screenProps}></Welcome> :
      <List screenProps={screenProps} date={this.state.date} items={this.state.accounts}></List>

    return (
      <View style={styles.container}>
        {
          this.state.loading ?
            <ActivityIndicatorLayer animating={true}></ActivityIndicatorLayer> :
            content
        }
        <Footer screenProps={screenProps}></Footer>
        <BottomNav screenProps={screenProps}></BottomNav>
      </View>
    )
  }
}

function convertBalanceFromWei(wei) {
  return ethUnit.convert(wei, 'wei', 'ether').toString()
}

const styles = StyleSheet.create({
  container: appStyles.container
})
