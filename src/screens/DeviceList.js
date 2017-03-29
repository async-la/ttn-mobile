// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'
import { DEVICE_DETAIL } from '../scopes/navigation/constants'

export default class DeviceList extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.appName,
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(DEVICE_DETAIL, {
              deviceId: 1,
              deviceName: 'Sensor1',
            })}
        >
          <Text style={styles.header}>Go To Device #1 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(DEVICE_DETAIL, {
              deviceId: 2,
              deviceName: 'Sensor2',
            })}
        >
          <Text style={styles.header}>Go To Device #2 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(DEVICE_DETAIL, {
              deviceId: 3,
              deviceName: 'Sensor3',
            })}
        >
          <Text style={styles.header}>Go To Device #3 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(DEVICE_DETAIL, {
              deviceId: 4,
              deviceName: 'Sensor4',
            })}
        >
          <Text style={styles.header}>Go To Device #4 Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 40,
            height: 40,
            alignSelf: 'flex-end',
            backgroundColor: '#e74c3c',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => alert("I'm a form!")}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>
            +
          </Text>
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
