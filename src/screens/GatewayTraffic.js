// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { MID_GREY, LIGHT_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

export default class GatewayDetailPlaceholder extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.gatewayName,
  })
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name={'ios-pulse'} size={80} color={MID_GREY} />
        <Text style={[styles.text, { fontSize: 30 }]}>Coming Soon!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
  },
  text: {
    fontFamily: LATO_REGULAR,
    color: MID_GREY,
  },
})
