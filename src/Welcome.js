import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import Warning from './Warning'
import List from './List'
import appStyles from './styles'

const styles = StyleSheet.create({
  warning: {
    padding: 20
  }
})

export default class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.rootNavigation = this.props.screenProps.rootNavigation
  }

  render() {
    return (
      <View style={appStyles.container}>
        <Warning customStyles={styles.warning} msg='Please add some addresses to track'></Warning>
      </View>
    )
  }
}
