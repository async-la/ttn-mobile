// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import TagLabel from '../components/TagLabel'

import { APPLICATION_DETAIL } from '../scopes/navigation/constants'
import { MID_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import type { TTNApplication } from '../scopes/content/applications/types'
import { removePrefix } from '../utils/textUtils'

type Props = {
  application: TTNApplication,
  navigation: Object,
}

export default class ApplicationListItem extends Component {
  props: Props
  _navigateToSingleApplication = application => {
    // TODO: clean up props -- knowing whether or not a handler is present
    // is useful info so we might as well pass the entire application [dan]
    this.props.navigation.navigate(APPLICATION_DETAIL, {
      application: application,
      appName: application.name,
      appId: application.id,
    })
  }
  render() {
    const { application } = this.props
    return (
      <TouchableOpacity
        onPress={() => this._navigateToSingleApplication(application)}
        style={styles.applicationItem}
      >
        <View style={styles.idHandlerRow}>
          <TagLabel center orange style={{ width: '50%' }}>
            {application.id}
          </TagLabel>
          <View style={[styles.applicationContainer, styles.handlerContainer]}>
            <Text style={styles.handlerText}>
              {removePrefix(application.handler, 'ttn-handler-')}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionRow}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.descriptionText}
          >
            {application.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  applicationItem: {
    backgroundColor: WHITE,
    borderRadius: 3,
    padding: 10,
    minHeight: 100,
    justifyContent: 'center',
  },
  idHandlerRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  descriptionRow: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop: 10,
    marginLeft: 5,
  },
  descriptionText: {
    color: MID_GREY,
    fontFamily: LATO_REGULAR,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  handlerContainer: {
    width: 70,
  },
  handlerText: {
    fontStyle: 'italic',
    fontSize: 10,
  },
})
