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
      <TouchableOpacity
        onPress={() => this._navigateToSingleDevice(device)}
        style={styles.deviceListItem}
      >
        <View style={styles.idStatusRow}>
          <TagLabel orange style={{ width: '50%' }}>
            {device.dev_id}
          </TagLabel>
          <StatusDot up={!!device.app_skey} />
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.descriptionText}
        >
          {device.description ? device.description : splitHex(device.dev_eui)}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deviceListItem: {
    backgroundColor: WHITE,
    borderRadius: 3,
    justifyContent: 'center',
    padding: 10,
    minHeight: 100,
  },
  idStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionText: {
    marginTop: 10,
    marginLeft: 5,
    color: MID_GREY,
    fontFamily: LATO_REGULAR,
  },
})
