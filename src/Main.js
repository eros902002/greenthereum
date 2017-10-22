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
import {STG_ADDRESSES} from './constants'
import API from './api'
import appStyles from './styles'

const debounce = require('lodash.debounce')

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
    this.navigation = this.props.navigation
    this.refresh = debounce(this.refresh.bind(this), API.const.MIN_REQUEST_TIME)
  }

  componentDidMount() {
    // this.removeAddresses()
    this.getAccounts()
  }

  getAccounts() {
    console.log(`getAccounts() in ${STG_ADDRESSES}`)
    AsyncStorage.getItem(STG_ADDRESSES)
      .then(API.getAccounts)
      .then((response) => response.json())
      .then((response) => response.result)
      .then((accounts) => {
        console.log(accounts)
        const items = accounts.map((account) => {
          return {
            key: account.account,
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

  addAddress() {
    console.log('addAddress()')
    this.navigation.navigate('Add', {
      Main: this
    })
  }

  refresh() {
    console.log('refresh()')
    this.getAccounts()
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
