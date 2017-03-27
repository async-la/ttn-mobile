// @flow

import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const mockApplication = {
  accessKeys: [
    {
      key: 'ttn-account-v2.8mJnERF9JBFJYAXO7HBMZd5UOIuuvb0CX7-hCpJ2KSE',
      name: 'default key',
      rights: ['messages:up:r', 'messages:down:w', 'devices'],
    },
  ],
  created: '2017-01-22T04:23:30.208Z',
  euis: ['70B3D57EF0003448'],
  handler: 'ttn-handler-us-west',
  id: '7581206457',
  name: 'Test',
}

const mockApplications = [mockApplication]

import { LATO_REGULAR } from '../constants/fonts'

export default class TTNConsole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Test</Text>
        <FlatList
          data={mockApplications}
          renderItem={application => <Text>{application.name}</Text>}
        />
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
