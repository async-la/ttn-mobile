// @flow

import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const mockApplications = [
  {
    euis: ['70B3D57EF0003448'],
    handler: 'ttn-handler-us-west',
    id: '758',
    name: 'Test',
  },
  {
    euis: ['70B3D57EF0003448'],
    handler: 'ttn-handler-us-west',
    id: '7581206457',
    name: 'Horses',
  },
  {
    euis: ['70B3D57EF0003448'],
    handler: 'ttn-handler-us-west',
    id: '1231206',
    name: 'Apples',
  },
  {
    euis: ['70B3D57EF0003448'],
    handler: 'ttn-handler-us-east',
    id: '8493206457',
    name: 'Westworld',
  },
  {
    euis: ['70B3D57EF0003448'],
    handler: 'ttn-handler-us-west',
    id: '7581206457832',
    name: 'Burgers',
  },
]

import { LATO_REGULAR } from '../constants/fonts'
import {
  LIGHT_GREY,
  LIGHT_ORANGE,
  ORANGE,
  DARK_ORANGE,
} from '../constants/colors'

export default class TTNConsole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Applications</Text>
        <FlatList
          data={mockApplications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderApplicationRow(item)}
          ItemSeparatorComponent={Separator}
          style={styles.list}
        />
      </View>
    )
  }
}

const Separator = () => <View style={styles.separator} />

const renderApplicationRow = application => {
  return (
    <View style={styles.applicationRow}>
      <View style={[styles.applicationContainer, styles.idContainer]}>
        <Text style={[styles.idText]}>{application.id}</Text>
      </View>
      <View style={[styles.applicationContainer, styles.nameContainer]}>
        <Text>{application.name}</Text>
      </View>
      <View style={[styles.applicationContainer, styles.handlerContainer]}>
        <Text style={[styles.handlerText]}>{application.handler}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: LIGHT_GREY,
  },
  applicationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  applicationContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  idContainer: {
    backgroundColor: LIGHT_ORANGE,
    borderBottomColor: ORANGE,
    borderBottomWidth: 1,
    borderRadius: 3,
    width: 120,
  },
  idText: {
    color: DARK_ORANGE,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  handlerContainer: {
    width: 110,
  },
  handlerText: {
    fontStyle: 'italic',
    fontSize: 10,
  },
})
