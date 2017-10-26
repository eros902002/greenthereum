import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#F5F5F5' // material grey 100
  },
  bottomGrid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  bottomBtn: {
    width: 32,
    height: 32
  }
})

export default class BottomNav extends React.Component {
  constructor(props) {
    super(props)
    this.addAddress = this.addAddress.bind(this)
    this.showList = this.showList.bind(this)
    this.showDetails = this.showDetails.bind(this)
    this.navigation = this.props.screenProps.rootNavigation
    this.mainComponent = this.props.screenProps.mainComponent
  }
  addAddress() {
    console.log('addAddress()')
    this.navigation.navigate('Add', {
      mainComponent: this.mainComponent
    })
  }
  showList() {
    console.log('list')
  }
  showDetails() {
    console.log('details')
  }
  getRefreshButton() {
    const refreshButton = require('../assets/img/refresh.png')
    return (
      <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.mainComponent.refresh}>
        <Image
          style={styles.bottomBtn}
          source={refreshButton}>
        </Image>
     </TouchableHighlight>
    )
  }
  render() {
    const addButton = require('../assets/img/plus.png')
    const listButton = require('../assets/img/list.png')
    return (
      <View style={styles.navigation}>
        <View style={styles.bottomGrid}>
          <TouchableHighlight key="add" underlayColor='transparent' onPress={this.addAddress}>
            <Image style={styles.bottomBtn} source={addButton}></Image>
         </TouchableHighlight>
        </View>
        <View style={styles.bottomGrid}>
          <TouchableHighlight key="list" underlayColor='transparent' onPress={this.showList}>
            <Image style={styles.bottomBtn} source={listButton}></Image>
          </TouchableHighlight>
        </View>
        <View style={styles.bottomGrid}>
          {this.getRefreshButton()}
       </View>
      </View>
    )
  }
}
