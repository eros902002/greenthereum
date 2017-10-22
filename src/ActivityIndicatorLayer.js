import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import appStyles from './styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class ActivityIndicatorLayer extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props.animating)
  }
  render() {
    return (
      <View style = {styles.container}>
         <ActivityIndicator
            animating = {this.props.animating}
            size = "large"
            style = {styles.activityIndicator}/>
      </View>
    )
  }
}
