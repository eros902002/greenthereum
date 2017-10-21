import React from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Header from './Header'
import styles from './styles'

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

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.navigation
    this.state = {
      address: ''
    }
  }

  addAddress() {
    console.log('navigate to Home')
    this.navigation.navigate('Home', {
      add: true,
      address: this.state.address
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
