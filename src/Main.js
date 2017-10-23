import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native'
import Units from 'ethereumjs-units'
import List from './List'
import Welcome from './Welcome'
import Header from './Header'
import Footer from './Footer'
import ActivityIndicatorLayer from './ActivityIndicatorLayer'
import {STG_ADDRESSES, STG_STATE} from './constants'
import API from './api'
import appStyles from './styles'

const debounce = require('lodash.debounce')

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      stats: {
        ethbtc: '-',
        ethusd: '-'
      },
      cached: false,
      date: null,
      loading: true
    }
    this.navigation = this.props.navigation
    this.getAccounts = this.getAccounts.bind(this)
    this.refresh = debounce(this.refresh.bind(this), API.const.MIN_REQUEST_TIME, {
      'leading': true,
      'trailing': false
    })
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
    API.getStats()
      .then((response) => response.json())
      .then((response) => response.result)
      .then((result) => {
        this.setState({
          stats: {
            ethbtc: result.ethbtc,
            ethusd: result.ethusd
          }
        })
      })
      .then(this.getAccounts)
      .catch((err) => { // load Backup
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
      })
  }
  getAccounts() {
    console.log(`getAccounts() in ${STG_ADDRESSES}`)
    return AsyncStorage.getItem(STG_ADDRESSES)
      .then(API.getAccounts)
      .then((response) => response.json())
      .then((response) => response.result)
      .then((accounts) => {
        console.log(accounts)
        const items = accounts.map((account) => {
          const balance = getBalance(account.balance)
          const usdBalance = (balance * Number(this.state.stats.ethusd)).toFixed(2)
          return {
            key: account.account,
            balance: balance,
            usd: usdBalance
          }
        })
        this.setState({
          accounts: items,
          loading: false,
          date: new Date()
        })
        return items
      })
      .then((accounts) => {
        console.log('update backup state:', JSON.stringify(this.state))
        AsyncStorage.setItem(STG_STATE, JSON.stringify(this.state))
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

  addAddress() {
    console.log('addAddress()')
    this.navigation.navigate('Add', {
      Main: this
    })
  }

  refresh() {
    console.log('refresh()')
    this.setState({
      loading: true
    })
    this.fetchData()
  }

getMenu() {
  const menu = []
  const refreshButton = require('../assets/img/refresh.png')
  const addButton = require('../assets/img/plus.png')

  //Order matters for Layout
  menu.push((
    <TouchableHighlight key="add" underlayColor='transparent' onPress={this.addAddress.bind(this)}>
      <Image style={styles.actionBtn} source={addButton}></Image>
   </TouchableHighlight>
  ))
  if (this.state.accounts.length) {
    menu.push((
      <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.refresh}>
        <Image
          style={[styles.actionBtn, styles.refresh]}
          source={refreshButton}>
        </Image>
     </TouchableHighlight>
    ))
  }
  return menu
}

  render() {
    const screenProps = {
      rootNavigation: this.navigation,
      mainState: this.state
    }
    const content = !this.state.accounts.length ?
      <Welcome screenProps={screenProps}></Welcome> :
      <List screenProps={screenProps} items={this.state.accounts}></List>

    return (
      <View style={styles.container}>
        <Header screenProps={screenProps}></Header>
        <View style={styles.actions}>
          {this.getMenu()}
        </View>
        {
          this.state.loading ?
            <ActivityIndicatorLayer animating={true}></ActivityIndicatorLayer> :
            content
        }
        <Footer screenProps={screenProps}></Footer>
      </View>
    )
  }
}

function getBalance(balance) {
  return Units.convert(balance, 'wei', 'eth')
}

const styles = StyleSheet.create({
  container: appStyles.container,
  actions: {
    flexDirection: 'row',
    'justifyContent': 'space-between',
    padding: 20
  },
  actionBtn: {
    width: 48,
    height: 48
  },
  refresh: {

  }
})
