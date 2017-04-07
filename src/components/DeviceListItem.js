// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { DARK_ORANGE, LIGHT_ORANGE, ORANGE, WHITE } from '../constants/colors'
import { DEVICE_DETAIL } from '../scopes/navigation/constants'

type Props = {
  device: Object,
  navigation: Object,
};

export default class DeviceListItem extends Component {
  props: Props;
  _navigateToSingleDevice = device => {
    this.props.navigation.navigate(DEVICE_DETAIL, {
      deviceId: device.dev_id,
      appId: device.app_id,
    })
  };
  render() {
    const { device } = this.props
    return (
      <TouchableOpacity onPress={() => this._navigateToSingleDevice(device)}>
        <View style={styles.applicationRow}>
          <View style={[styles.applicationContainer, styles.idContainer]}>
            <Text style={[styles.idText]}>{device.dev_id}</Text>
          </View>
          <View style={[styles.applicationContainer, styles.nameContainer]}>
            <Text>{device.name}</Text>
          </View>
          <View style={[styles.applicationContainer, styles.handlerContainer]}>
            <Text style={[styles.handlerText]}>{device.handler}</Text>
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
