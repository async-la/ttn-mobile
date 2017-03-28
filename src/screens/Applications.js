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

export default class TTNConsole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          <FormattedMessage id="app.general.test" defaultMessage="Test" />
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
