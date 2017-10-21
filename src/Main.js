import React from 'react'
import { StyleSheet, View } from 'react-native'
import List from './List'
import Welcome from './Welcome'
import appStyles from './styles'
const styles = StyleSheet.create({
  container: appStyles.container
})

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: []
    }

    // // api call with stored addresses
    // this.state.wallets.push({
    //   address:'asdadsadsadsads124341ad',
    //   amount: 100
    // })
    // this.state.wallets.push({
    //   address:'12335i6t12536475124354t',
    //   amount: 5
    // })
  }
  render() {
    const content = this.state.wallets.length
      ? <List items={this.state.wallets}></List>
      : <Welcome></Welcome>
    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  }
}
