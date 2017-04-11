// @flow
import React, { Component } from 'react'

import { View } from 'react-native'
import AppNavigator from './scopes/navigation/navigator'
import SplashHome from './screens/SplashHome'
import NotificationCenter from './components/NotificationCenter'

import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import type { State as authState } from './scopes/auth/reducer'
import type { State as navState } from './scopes/navigation/reducer'
import type { State as notificationState } from './scopes/notification/reducer'

type Props = {
  auth: authState,
  dispatch: Function,
  nav: navState,
  notification: notificationState,
};

class App extends Component {
  props: Props;
  renderApp = () => {
    const { auth } = this.props
    if (auth.accessToken) {
      return (
        <View style={{ flex: 1 }}>
          <AppNavigator
            navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.nav,
            })}
          />
          {this.props.notification.open && <NotificationCenter />}
        </View>
      )
    } else {
      return <SplashHome />
    }
  };
  render() {
    return this.renderApp()
  }
}

export default connect(state => ({
  auth: state.auth,
  nav: state.navigator,
  notification: state.notification,
}))(App)
