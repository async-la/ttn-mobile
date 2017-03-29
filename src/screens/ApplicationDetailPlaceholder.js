// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'

export default class ApplicationDetailPlaceholder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.header}>I'm an application!</Text>
          <Text>{this.props.navigation.state.key}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF00',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
