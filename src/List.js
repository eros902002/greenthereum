import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native'
import appStyles from './styles'
import Units from 'ethereumjs-units'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.rootNavigation = this.props.screenProps.rootNavigation
  }

  openAddress(address) {
    console.log(`open address ${address}`)
  }

  render() {
    return (
      <View style={[appStyles.container, style.listContainer]}>
        <View style={style.listHeader}>
          <Text style={style.listHeaderText}>Contracts Overview</Text>
        </View>
        <FlatList
          data={this.props.items}
          renderItem={this.print.bind(this)}
        />
      </View>
    )
  }

  print({item}) {
    const defaultImg = require('../assets/img/eth.png')
    return (
      <View>
        <TouchableHighlight key="refresh" underlayColor='transparent'
          onPress={this.openAddress.bind(this, item.key)}>
          <View style={style.listElem}>
            <Image
              style={style.listImg}
              source={defaultImg}>
            </Image>
            <Text style={style.listItemText}>
              {getShortAddress(item.key)}
            </Text>
            <Text style={style.listItemText}>
              {getBalance(item.balance)} ETH
            </Text>
          </View>
       </TouchableHighlight>
      </View>
    )
  }
}

function getShortAddress(address) {
  return `${address.substr(0, 3)}...${address.substr(-7)}`
}

function getBalance(balance) {
  return Units.convert(balance, 'wei', 'eth')
}

const style = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  listElem: {
    paddingTop: 10,
    flexDirection: 'row',
    'justifyContent': 'space-between'
  },
  listHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeaderText: {
    fontSize: 18
  },
  listImg: {
    width: 32,
    height: 32
  },
  listItemText: {
    fontSize: 14,
    paddingLeft: 5,
    paddingTop: 3
  }
})
