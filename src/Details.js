import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView
  } from 'react-native'
import QRCode from 'react-native-qrcode'
import {
  formatCurrency,
  formatEther
} from './lib/utils'
import appStyles from './lib/styles'

export default class AddAddress extends React.Component {
  static navigationOptions = {
    headerTitle: 'Account overview',
    headerStyle: appStyles.headerStyle,
    headerTitleStyle: appStyles.headerTitleStyle,
    headerTintColor: appStyles.color.white
  }
  constructor(props) {
    super(props)
    this.state = {
      account: {}
    }
    this.rootNavigation = this.props.navigation
  }

  componentDidMount() {
    const { params } = this.rootNavigation.state
    this.mainComponent = params.mainComponent
    this.setState((prevState) => {
      return {
        account: params.account,
        currency: this.mainComponent.currency
      }
    })
  }

  render() {
    const screenProps = {
      rootNavigation: this.navigation,
      mainComponent: this.mainComponent
    }
    const account = this.state.account
    return (
      <ScrollView style={style.container}>
        <View style={style.detail}>
          <View style={style.detailHeader}>
            <QRCode
              value={account.key}
              size={160}
              bgColor='black'
              fgColor='white'/>
              <Text style={style.address}>{account.key}</Text>
          </View>
          <View style={style.balanceRow}>
            <View style={style.balanceColumn}>
              <Text>
                <Text style={style.bold}>{formatEther(account.balance || '0')} </Text>
                  Ether
               </Text>
            </View>
            <View style={style.balanceColumn}>
              <Text>
                {formatCurrency(account.usd, this.state.currency)}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.detail}>
          <View style={style.transactions}>
            <Text style={style.transactionsTitle}>Transactions</Text>
          </View>
          <View style={style.transactionsList}>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: appStyles.container,
  detail: {
    backgroundColor: appStyles.color.white,
    marginTop: 3
  },
  detailHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  address: {
    paddingTop: 5,
    fontSize: 12,
    color: appStyles.color.primary[900]
  },
  balanceRow: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  balanceColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold'
  },
  transactions: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  transactionsTitle: {
    fontSize: 16
  },
  transactionsList: {
    flex: 1
  }
})
