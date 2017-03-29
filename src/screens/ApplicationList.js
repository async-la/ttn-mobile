// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'

export default class ApplicationsList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Application List</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() => this.props.navigation.navigate('ApplicationDetail')}
        >
          <Text style={styles.header}>Go To Application Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() => this.props.navigation.navigate('ApplicationDetail')}
        >
          <Text style={styles.header}>Go To Application Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() => this.props.navigation.navigate('ApplicationDetail')}
        >
          <Text style={styles.header}>Go To Application Detail</Text>
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
    backgroundColor: '#00FFFF',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
