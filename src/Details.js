import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
  } from 'react-native'
import QRCode from 'react-native-qrcode'
import Header from './Header'
import styles from './styles'

export default class AddAddress extends React.Component {
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
        account: params.account
      }
    })
  }

  render() {
    const screenProps = {
      rootNavigation: this.navigation,
      mainComponent: this.mainComponent
    }
    return (
      <View style={style.container}>
        <Header screenProps={screenProps}></Header>
        <View style={style.detailHeader}>
          <QRCode
            value={this.state.account.key}
            size={160}
            bgColor='black'
            fgColor='white'/>
            <Text style={style.address}>{this.state.account.key}</Text>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: styles.container,
  detailHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  address: {
    paddingTop: 5,
    fontSize: 12,
    color: styles.color.primary[900]
  }
})
