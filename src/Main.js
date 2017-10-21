import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native'
import List from './List'
import Welcome from './Welcome'
import Header from './Header'
import {API_KEY, STG_ADDRESSES, HOST} from './constants'
import appStyles from './styles'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
    this.navigation = this.props.navigation
  }

  componentDidMount() {
    // this.removeAddresses()
    this.getAccounts()
  }

  getAccounts() {
    console.log('getItem', STG_ADDRESSES)
    AsyncStorage.getItem(STG_ADDRESSES)
      .then(getAccountsAPI)
      .then((response) => response.json())
      .then((response) => response.result)
      .then((accounts) => {
        console.log(accounts)
        const items = accounts.map((account) => {
          return {
            key: account.account.substr(-5),
            balance: account.balance
          }
        })
        this.setState({
          accounts: items
        })
      })
      .catch((error) => {
        console.error(error)
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

  addAddressAction() {
    console.log('Add pressed')
    this.navigation.navigate('Add', {
      Main: this
    })
  }

  refresh() {
    this.getAccounts()
  }

getMenu() {
  const menu = []
  const refreshButton = require('../assets/img/refresh.png')
  const addButton = require('../assets/img/plus.png')

  //Order matters for Layout
  menu.push((
    <TouchableHighlight key="add" underlayColor='transparent' onPress={this.addAddressAction.bind(this)}>
      <Image style={styles.actionBtn} source={addButton}></Image>
   </TouchableHighlight>
  ))
  if (this.state.accounts.length) {
    menu.push((
      <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.refresh.bind(this)}>
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
      rootNavigation: this.navigation
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
        {content}
      </View>
    )
  }
}

function getAccountsAPI(value) {
  console.log('=> ', value)
  const addresses = value ? JSON.parse(value) : []
  const addressJoined = addresses.join(',')
  const BALANCE_URL = `${HOST}?module=account&action=balancemulti&tag=latest&apikey=${API_KEY}&address=${addressJoined}`
  if (addresses.length) {
    console.log(`fetch ${BALANCE_URL}`)
    return fetch(BALANCE_URL)
  }
  return []
}

const styles = StyleSheet.create({
  container: appStyles.container,
  actions: {
    flexDirection: 'row',
    'justifyContent': 'space-between',
    padding: 20
  },
  actionBtn: {
    width: 64,
    height: 64
  },
  refresh: {

  }
})
