// @flow

// Required when running app with Chrome Debugger off [cdro]
global.Intl = require('react-intl')

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import App from './App'
import DelayUntilBootstrapped from './components/DelayUntilBootstrapped'
import DeviceMonitor from './components/DeviceMonitor'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import { initializeClient } from './utils/apiClient'
import { LanguageProvider, translations } from './i18n'

import Raven from 'raven-js'
require('raven-js/plugins/react-native')(Raven)
Raven.config(
  'https://c301d1166c6d4a5ba1984df20f5a2160@sentry.io/159098'
).install()

const { store } = configureStore()
initializeClient(store)

export default class TTNConsole extends Component {
  render() {
    return (
      <Provider store={store}>
        <DeviceMonitor>
          <LanguageProvider translations={translations}>
            <DelayUntilBootstrapped>
              <App />
            </DelayUntilBootstrapped>
          </LanguageProvider>
        </DeviceMonitor>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('TTNConsole', () => TTNConsole)
