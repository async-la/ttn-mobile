// @flow

import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
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

import { LATO_REGULAR } from '../constants/fonts'

export default class TTNConsole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <FormattedMessage id="app.general.test" defaultMessage="Test" />
        </Text>
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
