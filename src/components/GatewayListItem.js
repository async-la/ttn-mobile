// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import StatusDot from '../components/StatusDot'
import TagLabel from '../components/TagLabel'

import { GATEWAY_DETAIL } from '../scopes/navigation/constants'
import { BLUE, MID_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import type { Gateway } from '../scopes/content/gateways/types'

type Props = {
  gateway: Gateway,
  navigation: Object,
}

export default class GatewayListItem extends Component {
  props: Props
  _navigateToSingleGateway = gateway => {
    // TODO: clean up props -- knowing whether or not a handler is present
    // is useful info so we might as well pass the entire gateway [dan]
    this.props.navigation.navigate(GATEWAY_DETAIL, {
      gateway: gateway,
      gatwayName: gateway.attributes.description,
      gatwayId: gateway.id,
    })
  }
  render() {
    const { gateway } = this.props
    return (
      <TouchableOpacity
        onPress={() => this._navigateToSingleGateway(gateway)}
        style={styles.gatewayItem}
      >
        <View style={styles.idHandlerRow}>
          <TagLabel center orange style={{ width: '50%' }}>
            {gateway.id}
          </TagLabel>
          <StatusDot
            downColor={MID_GREY}
            up={!!gateway.status.tx_in}
            upColor={BLUE}
          />
        </View>
        <View style={styles.descriptionRow}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.descriptionText}
          >
            {gateway.attributes.description}
          </Text>
          <Text style={styles.frequencyText}>
            {gateway.frequency_plan}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  gatewayItem: {
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  frequencyText: {
    fontStyle: 'italic',
    fontSize: 10,
  },
})
