//@flow
import React, { Component } from 'react'
import {
  ActivityIndicator,
  Button,
  InteractionManager,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import copy from '../constants/copy'
import { BLACK, DARK_GREY, MID_GREY } from '../constants/colors'
import { NO_ACCESS_KEY } from '../constants/errors'
import { LATO_REGULAR } from '../constants/fonts'

import ClipboardToggle from '../components/ClipboardToggle'
import ContentBlock from '../components/ContentBlock'
import StatusDot from '../components/StatusDot'
import TagLabel from '../components/TagLabel'
import { connect } from 'react-redux'

import type {
  TTNApplication,
  TTNDevice,
} from '../scopes/content/applications/types'
import * as TTNApplicationActions from '../scopes/content/applications/actions'

import moment from 'moment'

type Props = {
  application: TTNApplication,
  device: TTNDevice,
  getDeviceAsync: Function,
  navigation: Object,
}

type State = {
  isRefreshing: boolean,
}

class DeviceOverview extends Component {
  state: State = {
    isRefreshing: false,
  }
  props: Props
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.device.dev_id,
  })
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._getDevice(true)
    })
  }

  _getDevice = async (initialSync = false) => {
    const { dev_id } = this.props.device
    const { application } = this.props
    if (!initialSync) this.setState({ isRefreshing: true })
    try {
      await this.props.getDeviceAsync(application, dev_id)
    } catch (err) {
      console.log('# DeviceOverview getDevice error', err)
      alert('Error: ' + err.status)
      this.props.navigation.goBack(null)
    }
    this.setState({ isRefreshing: false })
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
    this._getDevice(false)
  }
  _linkTTNMapper = () => {
    const { application, device } = this.props
    const { app_id, dev_id } = device
    const { access_keys, handler } = application

    if (access_keys && access_keys.length === 0) {
      alert(NO_ACCESS_KEY)
      return
    } else {
      // @NOTE: Update to choose a valid access key
      const validAccessKey = access_keys && access_keys[0].key
      const link = `http://app.ttnmapper.org/?appid=${String(app_id)}&handler=${String(handler)}&accesskey=${String(validAccessKey)}&devid=${String(dev_id)}`
      Linking.openURL(link).catch(err =>
        console.error('An error occurred', err)
      )
    }
  }
  render() {
    const { device } = this.props
    if (!device) return <View />
    return (
      <View style={styles.container}>
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
              <Button
                onPress={this._linkTTNMapper}
                title="Track with TTN Mapper"
                color={BLACK}
              />
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

export default connect(
  (state, props) => ({
    device: state.content.devices.dictionary[
      props.navigation.state.params.device.dev_id
    ],
    application: state.content.applications.dictionary[
      props.navigation.state.params.device.app_id
    ],
  }),
  TTNApplicationActions
)(DeviceOverview)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
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
