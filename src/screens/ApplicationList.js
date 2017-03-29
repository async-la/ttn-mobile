// @flow

import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'
import { APPLICATION_DETAIL } from '../scopes/navigation/constants'

import {
  LIGHT_GREY,
  LIGHT_ORANGE,
  ORANGE,
  DARK_ORANGE,
} from '../constants/colors'

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

export default class ApplicationsList extends Component {
  renderApplicationRow(application) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(APPLICATION_DETAIL, {
            appName: application.name,
          })}
      >
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
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={mockApplications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => this.renderApplicationRow(item)}
          ItemSeparatorComponent={Separator}
          style={styles.list}
        />
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

const Separator = () => <View style={styles.separator} />

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
