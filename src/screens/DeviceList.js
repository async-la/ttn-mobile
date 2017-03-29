// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'

export default class DeviceList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate('DeviceDetail', { id: 1 })}
        >
          <Text style={styles.header}>Go To Device #1 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate('DeviceDetail', { id: 2 })}
        >
          <Text style={styles.header}>Go To Device #2 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate('DeviceDetail', { id: 3 })}
        >
          <Text style={styles.header}>Go To Device #3 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate('DeviceDetail', { id: 4 })}
        >
          <Text style={styles.header}>Go To Device #4 Detail</Text>
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
