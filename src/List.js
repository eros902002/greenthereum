import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  Linking
} from 'react-native'
import API from './api'
import appStyles from './styles'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.rootNavigation = this.props.screenProps.rootNavigation
  }

  openAddress(address) {
    console.log(`open address ${address}`)
    Linking.openURL(`${API.URL.ADDRESS_INFO}${address}`)
      .catch(err => console.error('An error occurred', err))
  }

  render() {
    return (
      <View style={[appStyles.container, style.listContainer]}>
        <View style={style.listHeader}>
          <Text style={style.listHeaderText}>Contracts Overview</Text>
        </View>
        <ScrollView>
          <FlatList
            data={this.props.items}
            renderItem={this.print.bind(this)}
          />
        </ScrollView>
      </View>
    )
  }

  print({item}) {
    const defaultImg = require('../assets/img/ethgreen.png')
    return (
      <View>
        <TouchableHighlight underlayColor='transparent'
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
              <Text style={style.bold}>{item.balance}</Text> ETH {'≈'}
              <Text style={style.bold}> {item.usd}</Text> USD
            </Text>
          </View>
       </TouchableHighlight>
      </View>
    )
  }
}

function getShortAddress(address) {
  return `${address.substr(0, 3)}...${address.substr(-3)}`
}

const style = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  listElem: {
    paddingTop: 10,
    flexDirection: 'row'
  },
  listHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeaderText: {
    fontSize: 16
  },
  listImg: {
    width: 32,
    height: 32
  },
  listItemText: {
    fontSize: 14,
    paddingLeft: 5,
    paddingTop: 3
  },
  bold: {
    fontWeight: 'bold'
  }
})
