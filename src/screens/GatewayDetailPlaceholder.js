// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class GatewayDetailPlaceholder extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.gatewayName,
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm a Gateway!</Text>
        <Text>{this.props.navigation.state.key}</Text>
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
