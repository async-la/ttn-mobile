// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import DataListItem from '../components/DataListItem'

import {
  CONNECTED,
  CLOSED,
  UNAUTHORIZED,
} from '../constants/mqttConnectionStatus'
import { GREEN, LIGHT_GREY, RED, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import { connect } from 'react-redux'
import { getApplicationMQTTHost } from '../utils/dataMonitor'
import {
  hasDevicesRights,
  getMessageUplinkPermission,
} from '../utils/permissionCheck'

import type { TTNApplication } from '../scopes/content/applications/types'

const { TTNMQTT } = NativeModules
const TTNMQTTManagerEmitter = new NativeEventEmitter(TTNMQTT)

type Props = {
  application: TTNApplication,
  navigation: Object,
}

type State = {
  connectionStatus: string,
  data: Array<Object>,
}

class ApplicationData extends Component {
  _subscriptionNewMessage = null
  _subscriptionConnectionLoss = null
  static navigationOptions = ({ navigation, screenProps }) => ({
    // deviceId supersedes appId
    title: (navigation.state.params && navigation.state.params.deviceId) ||
      navigation.state.params.appId ||
      '',
    headerRight: navigation.state.params.clearTitle &&
      <View style={styles.clearButton}>
        <Button
          title={navigation.state.params.clearTitle || ''}
          onPress={navigation.state.params.clearData || (() => {})}
        />
      </View>,
  })
  props: Props
  state: State = {
    connectionStatus: '',
    data: [],
  }
  componentDidMount() {
    const { application } = this.props
    if (!hasDevicesRights(application)) {
      this.setState({ connectionStatus: UNAUTHORIZED })
      return
    }

    this._createMQTTSession(application)
  }

  componentWillUnmount() {
    //@NOTE: The following check is necessary when deleting an application
    if (!this.props.application || !this.props.application.handler) return
    this._subscriptionNewMessage && this._subscriptionNewMessage.remove()
    this._subscriptionConnectionLoss &&
      this._subscriptionConnectionLoss.remove()

    TTNMQTT.destroySessionAsync()
  }

  _createMQTTSession = async application => {
    const messageUplinkPermission = getMessageUplinkPermission(application)
    if (!messageUplinkPermission) {
      this.setState({ connectionStatus: UNAUTHORIZED })
      return
    }

    try {
      const host = getApplicationMQTTHost(application)
      await TTNMQTT.createSessionAsync({
        host,
        username: application.id,
        password: messageUplinkPermission.key,
      })
    } catch (err) {
      console.error(err)
    }
    TTNMQTT.subscribeAsync(`${application.id}/devices/+/up`)
    TTNMQTT.getSessionStatus(this._handleSessionStatusCheck)
    this._subscriptionNewMessage = TTNMQTTManagerEmitter.addListener(
      'newMessage',
      this._handleIncommingMessage
    )
    this._subscriptionConnectionLoss = TTNMQTTManagerEmitter.addListener(
      'connectionLost',
      this._handleConnectionLoss
    )
  }
  _clearData = () => {
    this.setState({ data: [] })
    this.props.navigation.setParams({
      clearTitle: '',
      clearData: () => {},
    })
  }
  _handleConnectionLoss = () => {
    this.setState({ connectionStatus: CLOSED })
  }
  _handleSessionStatusCheck = (error, status) => {
    this.setState({ connectionStatus: status })
  }
  _handleIncommingMessage = message => {
    const { navigation } = this.props
    let data = this.state.data
    let parsedMessage = JSON.parse(message)

    if (!this.state.data.length) {
      this.props.navigation.setParams({
        clearTitle: 'Clear',
        clearData: this._clearData,
      })
    }

    // Filter out messages when in single device view
    if (
      navigation &&
      navigation.state.params &&
      navigation.state.params.deviceId !== parsedMessage.dev_id
    ) {
      return
    }

    data.unshift(parsedMessage)
    this.setState({ data })
  }
  _renderConnectionStatus = () => {
    let { connectionStatus } = this.state

    // Handle case where application has been deleted
    if (!connectionStatus || !this.props.application) return

    if (!this.props.application.handler) {
      connectionStatus = 'NO REGISTERED HANLDER'
    }

    const backgroundColor = connectionStatus === CONNECTED ? GREEN : RED
    return (
      <View style={[styles.connectionStatus, { backgroundColor }]}>
        {connectionStatus === CONNECTED
          ? <Text style={styles.connectionStatusText}>{connectionStatus}</Text>
          : <Text
              onPress={() => this._createMQTTSession(this.props.application)}
              style={styles.connectionStatusText}
            >{`${connectionStatus} - TAP TO RETRY`}</Text>}
      </View>
    )
  }
  _renderContent = () => {
    if (this.state.connectionStatus === UNAUTHORIZED) {
      return (
        <View>
          <Text>No access key with message rights found.</Text>
        </View>
      )
    } else if (
      this.state.data.length === 0 &&
      this.state.connectionStatus === CONNECTED
    ) {
      return (
        <View>
          <ActivityIndicator size="large" />
          <Text>Waiting for incoming data...</Text>
        </View>
      )
    } else {
      return (
        <FlatList
          data={this.state.data}
          initialListSize={this.state.data.length}
          keyExtractor={item => item.metadata.time}
          renderItem={({ item }) => <DataListItem data={item} />}
          ItemSeparatorComponent={Separator}
          style={styles.list}
        />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderConnectionStatus()}
        {this._renderContent()}
      </View>
    )
  }
}

const Separator = () => <View style={styles.separator} />

export default connect((state, props) => ({
  application: state.content.applications.dictionary[
    props.navigation.state.params.appId
  ],
}))(ApplicationData)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingTop: 25,
  },
  connectionStatus: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionStatusText: {
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
    color: WHITE,
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
  clearButton: {
    marginRight: Platform.OS === 'android' ? 15 : 0,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: LIGHT_GREY,
  },
})
