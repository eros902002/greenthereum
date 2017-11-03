import React from 'react'
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native'
import List from './List'
import Welcome from './Welcome'
import Footer from './Footer'
import BottomNav from './BottomNav'
import ActivityIndicatorLayer from './ActivityIndicatorLayer'
import {STG_ADDRESSES, STG_STATE, CURRENCIES} from './lib/constants'
import API from './lib/api'
import {convertBalanceFromWei} from './lib/utils'
import appStyles from './lib/styles'
import getConversionRates from './lib/currency'
const debounce = require('lodash.debounce')

export default class Main extends React.Component {
  static navigationOptions = {
    headerTitle: 'Greenthereum',
    headerStyle: appStyles.headerStyle,
    headerTitleStyle: appStyles.headerTitleMain
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
      preferences: {
        currency: CURRENCIES.DEFAULT,
      },
      conversionRates: {},
      cached: false,
      date: null,
      loading: true
    }
    this.navigation = this.props.navigation
    this.getAccounts = this.getAccounts.bind(this)
    this.refresh =this.refresh.bind(this)
    this.getPreferences = this.getPreferences.bind(this)
    this.updateBackupState = this.updateBackupState.bind(this)
    this.loadConversionRates = this.loadConversionRates.bind(this)
    this.fetchData = debounce(this.fetchData.bind(this), API.const.MIN_REQUEST_TIME, {
      'leading': true,
      'trailing': false
    })
  }

  componentDidMount() {
    this.setState({ loading: true })
    Promise.all([ // TODO add test: have been called
      this.getPreferences(),
      this.loadConversionRates()
    ])
      .then(() => {
        this.setState({ loading: false })
      })
      .catch((err) => {
        console.log('getPreferences, loadConversionRates', err)
        this.setState({ loading: false })
        this.showAlert('Something went wrong', err)
      })
      .then(this.fetchData)
  }

  getPreferences() {
    return AsyncStorage.getItem(STG_STATE)
      .then((result) => result ? JSON.parse(result) : {})
      .then(backupState => {
        if (backupState.preferences) {
          console.log('getPreferences ok')
          this.setState((prevState) => {
            return {
              preferences: backupState.preferences
            }
          })
        }
      })
  }

  loadConversionRates() {
    return AsyncStorage.getItem(STG_STATE)
      .then((result) => result ? JSON.parse(result) : {})
      .then(backupState => {
        if (backupState.conversionRates && backupState.conversionRates.date) {
          console.log('Backed conversionRates found', backupState.conversionRates)
          const now = new Date()
          const conversionsBackupDate = new Date(Date.parse(backupState.conversionRates.date))
          console.log(`conversionsBackupDate : ${conversionsBackupDate}`)
          // (Wait 2 days before update conversionRates)
          conversionsBackupDate.setDate(conversionsBackupDate.getDate() + 2)
          if (conversionsBackupDate >= now) { // load from Backup
            this.setState((prevState) => ({ conversionRates: backupState.conversionRates }))
            return Promise.resolve()
          }
        }
        console.log('fetching and update conversionRates...')
        return getConversionRates() // Update conversion rates
          .then(response => response.json())
          .then(data => {
            if (data.rates) {
              this.setState((prevState) => ({ conversionRates: data }))
              this.updateBackupState('update backup conversionRates')
            }
          })
          .catch((err) => {
            // reset to USD
            this.setState((prevState) => ({ currency:  CURRENCIES.DEFAULT }))
          })
      })
  }

  showAlert(msg, err) {
    Alert.alert(
      msg,
      `Info: ${err}.`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  updateBackupState(msg) {
    console.log(msg, JSON.stringify(this.state))
    return AsyncStorage.setItem(STG_STATE, JSON.stringify(this.state))
  }

  fetchData() {
    console.log('getStats()')
    this.setState({
      loading: true
    })
      // Fetch server data
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
        this.updateBackupState('update backup (stats, accounts):')
      })
      .then(API.getTotalSupply)
      .then((response) => response.json())
      .then((json) => {
        this.setState((prevState) => ({
          stats: Object.assign(this.state.stats, {
            supply: convertBalanceFromWei(json.result)
          })
        }))
        this.updateBackupState('update backup (supply):')
      })
      .catch(this.loadBackup.bind(this))
  }

  getAccounts() {
    console.log(`getAccounts() in ${STG_ADDRESSES}`)
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STG_ADDRESSES)
        .then((result) => result ? JSON.parse(result) : [])
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

const styles = StyleSheet.create({
  container: appStyles.container
})
