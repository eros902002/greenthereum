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
import QRCode from 'react-native-qrcode'
import API from './api'
import {
  formatDate,
  getBalanceText,
  getShortAddress
} from './utils'
import appStyles from './styles'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.rootNavigation = this.props.screenProps.rootNavigation
    this.mainComponent = this.props.screenProps.mainComponent
  }

  openAddress(account) {
    console.log(`open address ${account.key}`)
    this.mainComponent.setState((prevState) => {
      return {
        screen: 'details'
      }
    })
    this.rootNavigation.navigate('Details', {
      mainComponent: this.mainComponent,
      account: account
    })
    // Linking.openURL(`${API.URL.ADDRESS_INFO}${address}`)
    //   .catch(err => console.error('An error occurred', err))
  }

  render() {
    const fromCache = this.props.screenProps.mainState.cached
    const date = new Date(this.props.date)
    const stateDate = formatDate(date)
    return (
      <View style={[appStyles.container, style.listContainer]}>
        <View style={style.listHeader}>
          {
            fromCache ?
              <Text style={style.listHeaderTextCache}>
                Connection error: Last update {stateDate}
              </Text> : undefined
          }
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
    return (
      <TouchableHighlight underlayColor='transparent'
        onPress={this.openAddress.bind(this, item)}>
          <View style={style.listRow}>
            <View>
              <QRCode
                value={item.key}
                size={64}
                bgColor='black'
                fgColor='white'/>
            </View>
            <View style={style.listColumn}>
              <Text style={style.listAddress}>
                {getShortAddress(item.key)}
              </Text>
              <Text style={style.listItemInfo}>
                <Text style={style.bold}>{getBalanceText(item.balance)}</Text> ETH {'≈'}
                <Text style={style.bold}> {item.usd}</Text> USD
              </Text>
            </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const style = StyleSheet.create({
  listContainer: {
    flex: 1,
    height: 64
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: 10,
    marginTop: 3,
    backgroundColor: 'white'
  },
  columnInfo: {
    paddingLeft: 10
  },
  listColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeaderTextCache: {
    fontSize: 12
  },
  listImg: {
    width: 64,
    height: 64
  },
  listAddress: {
    fontSize: 18,
    color: '#1B5E20' // material green 900
  },
  listItemInfo: {
    fontSize: 12,
    paddingLeft: 5,
    paddingTop: 3
  },
  bold: {
    fontWeight: 'bold'
  }
})
