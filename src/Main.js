import React from 'react'
import { StyleSheet, View, TouchableHighlight, Image, FlatList } from 'react-native'
import List from './List'
import Welcome from './Welcome'
import Header from './Header'
import appStyles from './styles'

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

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: [{
        key: Math.random(),
        address: 'internet',
        amount: 0
      }]
    }
    this.navigation = this.props.navigation
  }

  componentDidMount() {
    const { params } = this.props.navigation.state

    if (params && params.add) {
      this.addWallet(params.address)
    }
  }

  onPressAddButton() {
    console.log('Add pressed')
    this.navigation.navigate('Add')
  }

  addWallet(address) {
    this.setState({
      wallets: this.state.wallets.concat([{
        key: Math.random(),
        address: address,
        amount: 0
      }])
    })
  }

  onRefresh() {
    console.log('refresh')
    this.setState({
      wallets: [
        {
          key: Math.random(),
          address: 'asdfghjk',
          amount: Math.random()
        }
      ]
    })
  }

getMenu() {
  const menu = []
  const refreshButton = require('../assets/img/refresh.png')
  const addButton = require('../assets/img/plus.png')

  //Order matters for Layout
  menu.push((
    <TouchableHighlight key="add" underlayColor='transparent' onPress={this.onPressAddButton.bind(this)}>
      <Image style={styles.actionBtn} source={addButton}></Image>
   </TouchableHighlight>
  ))
  if (this.state.wallets.length) {
    menu.push((
      <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.onRefresh.bind(this)}>
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
    const content = !this.state.wallets.length ?
      <Welcome screenProps={screenProps}></Welcome> :
      <List screenProps={screenProps} items={this.state.wallets}></List>

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
