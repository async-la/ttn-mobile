// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { MID_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'
import { DEVICE_DETAIL } from '../scopes/navigation/constants'

import StatusDot from '../components/StatusDot'
import TagLabel from '../components/TagLabel'
import { splitHex } from '../utils/payloadConversion'

type Props = {
  device: Object,
  navigation: Object,
}

export default class DeviceListItem extends Component {
  props: Props
  _navigateToSingleDevice = device => {
    const { navigation } = this.props
    const { application } = navigation.state.params
    navigation.navigate(DEVICE_DETAIL, {
      deviceId: device.dev_id,
      appId: device.app_id,
      application,
      device,
    })
  }
  render() {
    const { device } = this.props

    return (
      <TouchableOpacity onPress={() => this._navigateToSingleDevice(device)}>
        <View style={styles.deviceRow}>
          <View style={styles.deviceId}>
            <TagLabel orange>{device.dev_id}</TagLabel>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.deviceEui}>
              <Text style={styles.euiText}>{splitHex(device.dev_eui)}</Text>
            </View>
            <View style={styles.statusDot}>
              <StatusDot up={!!device.app_skey} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deviceRow: {
    backgroundColor: WHITE,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    minHeight: 100,
  },
  deviceId: {
    marginLeft: 20,
    maxWidth: 175,
  },
  deviceEui: {
    marginRight: 15,
    maxWidth: 180,
  },
  euiText: {
    color: MID_GREY,
    fontFamily: LATO_REGULAR,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 50,
  },
})
