import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    color: '#0D47A1'
  }
})

export default class Warning extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.customStyles]}>
        <Text style={styles.warningText}>{this.props.msg}</Text>
      </View>
    )
  }
}
