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

export default class TTNConsole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>New Tab!!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00FF',
  },
})
