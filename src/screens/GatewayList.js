// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'

export default class GatewayList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>GATEWAY LIST</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() => this.props.navigation.navigate('GatewayDetail')}
        >
          <Text style={styles.header}>Go To Gateway Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() => this.props.navigation.navigate('GatewayDetail')}
        >
          <Text style={styles.header}>Go To Gateway Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() => this.props.navigation.navigate('GatewayDetail')}
        >
          <Text style={styles.header}>Go To Gateway Detail</Text>
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
    backgroundColor: '#00FF00',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
