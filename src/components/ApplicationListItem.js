// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { DARK_ORANGE, LIGHT_ORANGE, ORANGE, WHITE } from '../constants/colors'

import { APPLICATION_DETAIL } from '../scopes/navigation/constants'
import type { TTNApplication } from '../scopes/content/applications/types'

type Props = {
  application: TTNApplication,
  navigation: Object,
};

export default class ApplicationListItem extends Component {
  props: Props;
  _navigateToSingleApplication = application => {
    this.props.navigation.navigate(APPLICATION_DETAIL, {
      appName: application.name,
      appId: application.id,
    })
  };
  render() {
    const { application } = this.props
    return (
      <TouchableOpacity
        onPress={() => this._navigateToSingleApplication(application)}
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
}

const styles = StyleSheet.create({
  applicationRow: {
    backgroundColor: WHITE,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    minHeight: 100,
  },
  applicationContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  idContainer: {
    alignSelf: 'center',
    backgroundColor: LIGHT_ORANGE,
    borderBottomColor: ORANGE,
    borderBottomWidth: 1,
    borderRadius: 3,
    width: 120,
    height: 30,
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
