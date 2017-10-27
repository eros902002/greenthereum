import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View
  } from 'react-native'
import appStyles from './styles'
import {isEthereumAddress} from './utils'
import {STG_ADDRESSES} from './constants'

export default class AddAddress extends React.Component {
  static navigationOptions = {
    headerTitle: 'Account',
    headerStyle: appStyles.headerStyle,
    headerTitleStyle: appStyles.headerTitleStyle
  }

  constructor(props) {
    super(props)
    this.navigation = this.props.navigation
    this.addAddress = this.addAddress.bind(this)
    this.updateText = this.updateText.bind(this)
    this.state = {
      valid: true,
      address: ''
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    this.mainComponent = params.mainComponent
  }

  addAddress() {
    const newAddress = [this.state.address]
    if (this.state.valid) {
      console.log('mergeItem', newAddress)
      AsyncStorage.getItem(STG_ADDRESSES)
        .then((addressesStr) => {
          if (addressesStr) {
            // update
            const addresses = JSON.parse(addressesStr)
            addresses.push(newAddress)
            AsyncStorage.setItem(STG_ADDRESSES, JSON.stringify(addresses))
          } else {
            AsyncStorage.setItem(STG_ADDRESSES, JSON.stringify(newAddress))
          }
        })
        .then(() => {
          console.log('address updated')
          this.mainComponent.refresh()
          this.navigation.goBack()
        })
    }
  }

  updateText(text){
    this.setState({
      address: text,
      valid: isEthereumAddress(text)
    })
  }

  render() {
    const submitButton = require('../assets/img/download.png')
    const screenProps = {
      rootNavigation: this.navigation
    }
    const inputValidation = this.state.valid ?
      undefined :
      <Text style={style.validation}>Please paste or write a valid address</Text>
    return (
      <View style={style.container}>
        <View style={style.center}>
          <View style={style.inputContainer}>
            <TextInput
              style={style.input}
              placeholder="ethereum address"
             onChangeText={this.updateText}
             autoFocus={true}
             autoCorrect={false}
             blurOnSubmit={true}
             maxLength={42}
             returnKeyType='send'
             onSubmitEditing={this.addAddress}
            />
          </View>
          {inputValidation}
        </View>
        <View style={style.containerSubmit}>
          <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.addAddress}>
            <Image
              style={style.submit}
              source={submitButton}>
            </Image>
         </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  inputContainer: {
    paddingTop: 10
  },
  input: {
    height: 60,
    width: 300,
    padding: 20
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    paddingTop: 20
  },
  submit: {
    width: 64,
    height: 64
  },
  validation: {
    paddingTop: 5,
    color: '#F44336' // material red 500
  }
})
