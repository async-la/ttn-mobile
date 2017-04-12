// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import TagLabel from '../components/TagLabel'

import { APPLICATION_DETAIL } from '../scopes/navigation/constants'
import { WHITE } from '../constants/colors'

import type { TTNApplication } from '../scopes/content/applications/types'

type Props = {
  application: TTNApplication,
  navigation: Object,
};

export default class ApplicationListItem extends Component {
  props: Props;
  _navigateToSingleApplication = application => {
    // TODO: clean up props -- knowing whether or not a handler is present
    // is useful info so we might as well pass the entire application [dan]
    this.props.navigation.navigate(APPLICATION_DETAIL, {
      application: application,
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
          <TagLabel center orange>{application.id}</TagLabel>
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
    alignItems: 'center',
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
