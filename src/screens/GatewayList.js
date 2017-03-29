// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'
import { GATEWAY_DETAIL, GATEWAYS_LABEL } from '../scopes/navigation/constants'

export default class GatewayList extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: GATEWAYS_LABEL,
    }),
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>GATEWAY LIST</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(GATEWAY_DETAIL, {
              gatewayId: 1,
              gatewayName: 'Home',
            })}
        >
          <Text style={styles.header}>Home Gateway</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(GATEWAY_DETAIL, {
              gatewayId: 2,
              gatewayName: 'Office',
            })}
        >
          <Text style={styles.header}>Office Gateway</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(GATEWAY_DETAIL, {
              gatewayId: 3,
              gatewayName: 'Remote',
            })}
        >
          <Text style={styles.header}>Remote Gateway</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FF00',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
