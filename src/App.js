// @flow
import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import AppNavigator from './scopes/navigation/navigator'
import SplashHome from './screens/SplashHome'

import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

const codePush = require('react-native-code-push')

type Props = {
  auth: Object,
  dispatch: Function,
  nav: Object,
}

class App extends Component {
  props: Props
  _navigator = null
  renderApp = () => {
    const { auth } = this.props
    if (auth.accessToken) {
      return (
        <AppNavigator
          ref={i => (this._navigator = i)}
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
  _handleBackButtonPress = () => {
    if (this._navigator !== null) this._navigator.props.navigation.goBack(null)
    return true
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this._handleBackButtonPress
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackButtonPress
    )
  }

  render() {
    return this.renderApp()
  }
}

export default connect(state => ({
  auth: state.auth,
  nav: state.navigator,
}))(codePush(App))
