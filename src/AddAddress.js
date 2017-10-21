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
import Header from './Header'
import styles from './styles'
import {STG_ADDRESSES} from './constants'

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.navigation
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    this.MainComponent = params.Main
  }

  addAddress() {
    const newAddress = [this.state.address]
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
        this.MainComponent.refresh()
        this.navigation.goBack()
      })
  }

  render() {
    const submitButton = require('../assets/img/download.png')
    const screenProps = {
      rootNavigation: this.navigation
    }
    return (
      <View style={styles.container}>
        <Header screenProps={screenProps}></Header>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            placeholder="Ethereum address"
           onChangeText={(text) => this.setState({ address: text })}
           autoFocus

          />
        </View>
        <View style={style.containerSubmit}>
          <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.addAddress.bind(this)}>
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
    padding: 20,
    margin: 10
  },
  containerSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  submit: {
    width: 64,
    height: 64
  }
})
