// @flow

import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import { LATO_REGULAR } from '../constants/fonts'
import {
  APPLICATION_DETAIL,
  APPLICATIONS_LABEL,
} from '../scopes/navigation/constants'

export default class ApplicationsList extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: APPLICATIONS_LABEL,
    }),
  };

  state = {
    modalVisible: false,
  };
  
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
              Add Application
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
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text style={styles.header}>Application List</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(APPLICATION_DETAIL, {
              appName: 'Moisture',
            })}
        >
          <Text style={styles.header}>Moisture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(APPLICATION_DETAIL, {
              appName: 'Temperature',
            })}
        >
          <Text style={styles.header}>Temperature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#FF00FF' }}
          onPress={() =>
            this.props.navigation.navigate(APPLICATION_DETAIL, {
              appName: 'Air Quality',
            })}
        >
          <Text style={styles.header}>Air Quality</Text>
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
    backgroundColor: '#00FFFF',
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
