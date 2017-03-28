// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  AsyncStorage,
  ListView,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import queryString from 'query-string'
import base64 from 'base-64'

import { LATO_REGULAR } from '../constants/fonts'

export default class TTNConsole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Test</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
