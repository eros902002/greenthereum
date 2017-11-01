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
    padding: 8
  },
  bottomBtn: {
    width: 36,
    height: 36
  },
  font10: {
    fontSize: 10
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default class BottomNav extends React.Component {
  constructor(props) {
    super(props)
    this.addAddress = this.addAddress.bind(this)
    this.openSettings = this.openSettings.bind(this)
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
  openSettings() {
    console.log('settings')
  }
  showDetails() {
    console.log('details')
  }

  render() {
    const importBtn = require('../assets/img/download.png')
    const refreshButton = require('../assets/img/refreshSecundary.png')
    const settingsBtn = require('../assets/img/settings.png')

    return (
      <View style={styles.navigation}>
        <View style={styles.bottomGrid}>
          <TouchableHighlight key="add" underlayColor='transparent' onPress={this.addAddress}>
            <View style={styles.col}>
              <Image style={styles.bottomBtn} source={importBtn}></Image>
              <Text style={styles.font10}>Import</Text>
            </View>
         </TouchableHighlight>
        </View>
        <View style={styles.bottomGrid}>
          <TouchableHighlight key="refresh" underlayColor='transparent' onPress={this.mainComponent.refresh}>
            <View style={styles.col}>
              <Image
                style={styles.bottomBtn}
                source={refreshButton}>
              </Image>
              <Text style={styles.font10}>Refresh</Text>
            </View>
         </TouchableHighlight>
       </View>
        <View style={styles.bottomGrid}>
          <View style={styles.col}>
            <TouchableHighlight key="confs" underlayColor='transparent' onPress={this.openSettings}>
              <Image style={styles.bottomBtn} source={settingsBtn}></Image>
            </TouchableHighlight>
            <Text style={styles.font10}>Settings</Text>
          </View>
        </View>
      </View>
    )
  }
}
