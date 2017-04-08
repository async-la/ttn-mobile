// @flow

import React, { Component } from 'react'
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ClearButton from '../components/ClearButton'
import DataListItem from '../components/DataListItem'

import {
  CONNECTED,
  CLOSED,
  UNAUTHORIZED,
} from '../constants/mqttConnectionStatus'
import { LIGHT_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import { connect } from 'react-redux'
import { getApplicationMQTTHost } from '../utils/dataMonitor'
import { getMessageUplinkPermission } from '../utils/permissionCheck'

import type { TTNApplication } from '../scopes/content/applications/types'

const { TTNMQTT } = NativeModules
const TTNMQTTManagerEmitter = new NativeEventEmitter(TTNMQTT)

type Props = {
  application: TTNApplication,
};

type State = {
  connectionStatus: string,
  data: Array<Object>,
};

class ApplicationData extends Component {
  _subscription = () => {};
  static navigationOptions = {
    header: ({ state }) => ({
      title: state.params.appName,
    }),
  };

  props: Props;
  state: State = {
    connectionStatus: '',
    data: [],
  };

  componentDidMount() {
    const { application } = this.props
    const messageUplinkPermission = getMessageUplinkPermission(application)
    if (messageUplinkPermission) {
      this._createMQTTSession(application, messageUplinkPermission.key)
    } else {
      // User doesn't have proper permissions
      this.setState({ connectionStatus: UNAUTHORIZED })
    }
  }

  componentWillUnmount() {
    this._subscription && this._subscription.remove()
    TTNMQTT.destroySessionAsync()
  }

  _createMQTTSession = async (application, key) => {
    try {
      const host = getApplicationMQTTHost(application)
      await TTNMQTT.createSessionAsync({
        host,
        username: application.id,
        password: key,
      })
    } catch (err) {
      console.error(err)
    }
    TTNMQTT.subscribeAsync(`${application.id}/devices/+/up`)
    TTNMQTT.getSessionStatus(this._handleSessionStatusCheck)
    this._subscription = TTNMQTTManagerEmitter.addListener(
      'newMessage',
      this._handleIncommingMessage
    )
    this._subscription = TTNMQTTManagerEmitter.addListener(
      'connectionLost',
      this._handleConnectionLoss
    )
  };
  _clearData = () => {
    this.setState({ data: [] })
  };

  _handleConnectionLoss = () => {
    this.setState({ connectionStatus: CLOSED })
  };
  _handleSessionStatusCheck = (error, status) => {
    this.setState({ connectionStatus: status })
  };
  _handleIncommingMessage = message => {
    let data = this.state.data
    let parsedMessage = JSON.parse(message)

    data.unshift(parsedMessage)
    this.setState({ data })
  };
  _renderContent = () => {
    if (
      this.state.data.length === 0 && this.state.connectionStatus === CONNECTED
    ) {
      return <Text>Listening to Data</Text>
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
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.connectionStatus}</Text>
        {this._renderContent()}
        <ClearButton onPress={this._clearData} />
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
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
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
