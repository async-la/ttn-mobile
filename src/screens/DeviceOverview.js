//@flow
import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native'

import copy from '../constants/copy'
import { DARK_GREY, MID_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import ClipboardToggle from '../components/ClipboardToggle'
import ContentBlock from '../components/ContentBlock'
import StatusDot from '../components/StatusDot'
import TagLabel from '../components/TagLabel'
import { connect } from 'react-redux'

import type { Device } from '../scopes/content/applications/types'
import * as TTNApplicationActions from '../scopes/content/applications/actions'

import moment from 'moment'

type State = {
  device: Device,
  isRefreshing: boolean,
}

class DeviceOverview extends Component {
  state: State = {
    device: {
      app_eui: null,
      dev_id: null,
    },
    isRefreshing: false,
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.device.dev_id,
  })
  componentDidMount() {
    this._getDevice()
  }

  _getDevice = async () => {
    const { dev_id } = this.props.navigation.state.params.device
    const { application } = this.props.navigation.state.params
    this.setState({ isRefreshing: true })
    const device = await this.props.getDeviceAsync(application, dev_id)
    this.setState({ isRefreshing: false, device })
  }
  _renderRow(label, component, content) {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        {content
          ? component
          : <Text style={styles.content}>{`${label} ${copy.NOT_FOUND}`}</Text>}
      </View>
    )
  }

  _renderStatus(lastSeen, appSessionKey) {
    // always print actual seconds instead of 'a few seconds ago'
    moment.relativeTimeThreshold('ss', 0)
    const statusMsg = !appSessionKey || lastSeen.toObject().years === 0
      ? copy.NEVER_SEEN
      : lastSeen.fromNow()
    return (
      <View style={styles.statusContainer}>
        <StatusDot up={!!appSessionKey} />
        <Text style={styles.statusMsg}>{statusMsg}</Text>
      </View>
    )
  }

  _onRefresh = () => {
    this._getDevice()
  }
  render() {
    const { device } = this.state
    return (
      <View style={{ flex: 1 }}>
        {!device.dev_id
          ? <ActivityIndicator style={styles.activityIndicator} size="large" />
          : <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <ContentBlock heading={copy.DEVICE_OVERVIEW}>
                {this._renderRow(
                  copy.APPLICATION_ID,
                  <TagLabel orange>{device.app_id}</TagLabel>,
                  device.app_id
                )}
                {this._renderRow(
                  copy.DEVICE_ID,
                  <Text style={styles.content}>{device.dev_id}</Text>,
                  device.dev_id
                )}
                {this._renderRow(
                  copy.DESCRIPTION,
                  <Text style={styles.content}>{device.description}</Text>,
                  device.description
                )}
              </ContentBlock>

              <ContentBlock heading={copy.STATUS}>
                {this._renderRow(
                  copy.STATUS,
                  this._renderStatus(moment(device.last_seen), device.app_skey),
                  true
                )}
                {this._renderRow(
                  copy.FRAMES_UP,
                  <Text style={styles.content}>{device.fcnt_up}</Text>,
                  true
                )}
                {this._renderRow(
                  copy.FRAMES_DOWN,
                  <Text style={styles.content}>{device.fcnt_down}</Text>,
                  true
                )}
              </ContentBlock>

              <ContentBlock heading={copy.EUIS}>
                {this._renderRow(
                  copy.DEVICE_EUI,
                  <ClipboardToggle value={device.dev_eui} />,
                  device.dev_eui
                )}
                {this._renderRow(
                  copy.APPLICATION_EUI,
                  <ClipboardToggle value={device.app_eui || ''} />,
                  device.app_eui
                )}
              </ContentBlock>

              <ContentBlock heading={copy.KEYS}>
                {this._renderRow(
                  copy.APP_KEY,
                  <ClipboardToggle value={device.app_key} sensitive />,
                  device.app_key
                )}
                {this._renderRow(
                  copy.NETWORK_SESSION_KEY,
                  <ClipboardToggle value={device.nwk_skey} sensitive />,
                  device.nwk_skey
                )}
                {this._renderRow(
                  copy.APP_SESSION_KEY,
                  <ClipboardToggle value={device.app_skey} sensitive />,
                  device.app_skey
                )}
              </ContentBlock>

              <ContentBlock heading={copy.ADDRESS}>
                {this._renderRow(
                  copy.DEVICE_ADDRESS,
                  <ClipboardToggle value={device.dev_addr} />,
                  device.dev_addr
                )}
              </ContentBlock>
            </ScrollView>}
      </View>
    )
  }
}

export default connect(null, TTNApplicationActions)(DeviceOverview)

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 30,
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
    color: DARK_GREY,
    marginBottom: 5,
    fontSize: 16,
  },
  content: {
    fontFamily: LATO_REGULAR,
    color: MID_GREY,
    fontSize: 16,
  },
  spacer: {
    height: 40,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusMsg: {
    color: DARK_GREY,
    fontFamily: LATO_REGULAR,
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 20,
  },
})
