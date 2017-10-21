import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native'
import appStyles from './styles'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.rootNavigation = this.props.screenProps.rootNavigation
  }

  openAddress(address) {
    console.log(`open address ${address}`)
  }

  render() {
    return (
      <View style={[appStyles.container, style.listContainer]}>
        <View style={style.listHeader}>
          <Text style={style.listHeaderText}>Address</Text>
        </View>
        <FlatList
          data={this.props.items}
          renderItem={this.print.bind(this)}
        />
      </View>
    )
  }

  print({item}) {
    const defaultImg = require('../assets/img/eth.png')
    return (
      <View>
        <TouchableHighlight key="refresh" underlayColor='transparent'
          onPress={this.openAddress.bind(this, item.key)}>
          <View style={style.listElem}>
            <Image
              style={style.listImg}
              source={item.img || defaultImg}>
            </Image>
            <Text style={style.listItemText}>
              {item.key} - $ {item.balance}
            </Text>
          </View>
       </TouchableHighlight>
      </View>
    )
  }
}

const style = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  listElem: {
    paddingTop: 10,
    flexDirection: 'row',
    'justifyContent': 'flex-start'
  },
  listHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeaderText: {
    fontSize: 18
  },
  listImg: {
    width: 32,
    height: 32
  },
  listItemText: {
    fontSize: 14,
    paddingLeft: 5,
    paddingTop: 3
  }
})
