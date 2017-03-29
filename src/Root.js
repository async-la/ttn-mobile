// @flow

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import App from './App'
import DelayUntilBootstrapped from './components/DelayUntilBootstrapped'
import DeviceMonitor from './components/DeviceMonitor'
import SplashHome from './screens/SplashHome'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import { initializeClient } from './utils/apiClient'

const { store } = configureStore()
initializeClient(store)

export default class TTNConsole extends Component {
  render() {
    return (
      <Provider store={store}>
        <DeviceMonitor>
          <DelayUntilBootstrapped>
            <App />
            {/* <SplashHome /> */}
          </DelayUntilBootstrapped>
        </DeviceMonitor>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('TTNConsole', () => TTNConsole)
