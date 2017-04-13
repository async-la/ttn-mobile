// @flow

import React, { Component } from 'react'
import DeviceMonitor from 'react-native-device-monitor'

import { connect } from 'react-redux'
import * as deviceActions from '../scopes/device'

type Props = {
  children: Object,
  setAppState: typeof deviceActions.setAppState,
  setKeyboardStatus: typeof deviceActions.setKeyboardStatus,
  setNetworkStatus: typeof deviceActions.setNetworkStatus,
  setViewport: typeof deviceActions.setViewport,
};

class AppDeviceMonitor extends Component {
  props: Props;
  render() {
    return (
      <DeviceMonitor
        onAppState={this.props.setAppState}
        onKeyboard={this.props.setKeyboardStatus}
        onConnectivityChange={this.props.setNetworkStatus}
        onViewport={this.props.setViewport}
      >
        {this.props.children}
      </DeviceMonitor>
    )
  }
}

export default connect(null, deviceActions)(AppDeviceMonitor)
