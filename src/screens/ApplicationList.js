// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'
import {
  APPLICATION_DETAIL,
  APPLICATIONS_LABEL,
} from '../scopes/navigation/constants'

export default class ApplicationsList extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: APPLICATIONS_LABEL,
    }),
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Application List</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(APPLICATION_DETAIL, {
              appName: 'Moisture',
            })}
        >
          <Text style={styles.header}>Moisture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(APPLICATION_DETAIL, {
              appName: 'Temperature',
            })}
        >
          <Text style={styles.header}>Temperature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(APPLICATION_DETAIL, {
              appName: 'Air Quality',
            })}
        >
          <Text style={styles.header}>Air Quality</Text>
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
    backgroundColor: '#00FFFF',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
