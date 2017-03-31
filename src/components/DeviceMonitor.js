// @flow

import React, { Component, PropTypes } from 'react'
import DeviceMonitor from 'react-native-device-monitor'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as deviceActions from '../scopes/device/actions'

class AppDeviceMonitor extends Component {
  static propTypes = {
    setAppState: PropTypes.func,
    setKeyboardStatus: PropTypes.func,
    setNetworkStatus: PropTypes.func,
    setViewport: PropTypes.func,
  };
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

export default connect(null, dispatch => ({
  ...bindActionCreators(deviceActions, dispatch),
}))(AppDeviceMonitor)
