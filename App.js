import React from 'react'
import List from './src/List'
import Welcome from './src/Welcome'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: []
    }

    // api call with stored addresses
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
    return content
  }
}
