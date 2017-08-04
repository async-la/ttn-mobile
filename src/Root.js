// @flow

// Required when running app with Chrome Debugger off [cdro]
global.Intl = require('react-intl')

import React, { Component } from 'react'

import App from './App'
import DelayUntilBootstrapped from './components/DelayUntilBootstrapped'
import DeviceMonitor from './components/DeviceMonitor'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import { initializeClient } from './utils/apiClient'
import { LanguageProvider, translations } from './i18n'

import configureSentry from './utils/configureSentry'
configureSentry()

const { store } = configureStore()
initializeClient(store)

export default class TTNMobile extends Component {
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
