import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
  render() {
    return (
      <View style={style.header}>
        <Text style={style.headerText}>Greenthereum</Text>
      </View>
    )
  }
}
