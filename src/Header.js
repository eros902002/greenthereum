import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

const style = StyleSheet.create({
  header: {
    backgroundColor: '#e9ffe5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    padding: 26,
    fontSize: 18
  }
})

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.screenProps.rootNavigation
  }
  onPressHeader() {
    console.log('Header pressed')
    this.navigation.goBack()
  }
  render() {
    return (
      <View style={style.header}>
        <TouchableHighlight underlayColor='transparent' onPress={this.onPressHeader.bind(this)}>
          <Text style={style.headerText}>Greenthereum</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
