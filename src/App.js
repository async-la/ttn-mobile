// @flow
import React, { Component } from 'react'

import AppNavigator from './scopes/navigation/navigator'
import SplashHome from './screens/SplashHome'

import codePush from 'react-native-code-push'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

type Props = {
  auth: Object,
  dispatch: Function,
  nav: Object,
}

class App extends Component {
  props: Props
  renderApp = () => {
    const { auth } = this.props
    if (auth.accessToken) {
      return (
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })}
        />
      )
    } else {
      return <SplashHome />
    }
  }
  render() {
    return this.renderApp()
  }
}

export default connect(state => ({
  auth: state.auth,
  nav: state.navigator,
}))(codePush(App))
