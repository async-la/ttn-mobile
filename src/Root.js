// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
        <View style={styles.container}>
          <DelayUntilBootstrapped>
            <App />
          {/* <SplashHome /> */}
          </DelayUntilBootstrapped>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('TTNConsole', () => TTNConsole);
