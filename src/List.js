import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import styles from './styles'

const css = StyleSheet.create({
  container: styles.container,
})

export default class List extends React.Component {
  render() {
    const data = this.props.items.reduce((acc, item, index) => {
      item.key = index
      acc.push(item)
      return acc
    },[])
    return <View style={css.container}>
      <FlatList
        data={data}
        renderItem={this.print}
      />
    </View>
  }

  print({item}) {
    return <Text>{item.address} - $ {item.amount}</Text>
  }
}
