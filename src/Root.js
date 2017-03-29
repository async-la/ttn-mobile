// @flow

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import DelayUntilBootstrapped from './components/DelayUntilBootstrapped'
import App from './App'

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
        <DelayUntilBootstrapped>
          <App />
          {/* <SplashHome /> */}
        </DelayUntilBootstrapped>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('TTNConsole', () => TTNConsole)
