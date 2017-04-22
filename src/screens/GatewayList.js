// @flow

import React, { Component } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'
import { WHITE } from '../constants/colors'
import { GATEWAY_DETAIL, GATEWAYS_LABEL } from '../scopes/navigation/constants'

export default class GatewayList extends Component {
  static navigationOptions = {
    title: GATEWAYS_LABEL,
  }
  state = {
    modalVisible: false,
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={{ marginTop: 40, marginLeft: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              Add Gateway
            </Text>
            <Text>I'm a form!</Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#3498db',
                padding: 20,
                marginTop: 20,
                width: 100,
                borderRadius: 5,
              }}
              onPress={() => {
                this.setState({ modalVisible: false })
              }}
            >
              <Text style={{ color: WHITE, fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: WHITE }}>
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
