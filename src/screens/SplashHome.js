// @flow
import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native'

import SafariView from 'react-native-safari-view'
import SubmitButton from '../components/SubmitButton'
import { connect } from 'react-redux'

import { AUTHORIZATION_URI } from '../constants/apiEndpoints'
import * as authActions from '../scopes/auth/actions'

type Props = {
  getAccessTokenAsync: typeof authActions.getAccessTokenAsync,
}

type State = {
  loading: boolean,
}

class SplashHome extends Component {
  props: Props
  state: State = {
    loading: false,
  }
  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
    this.setState({ loading: false })
  }

  _authorize = () => {
    if (Platform.OS === 'ios') {
      SafariView.show({ url: AUTHORIZATION_URI, fromBottom: true })
    } else {
      Linking.openURL(AUTHORIZATION_URI)
    }
  }
  _handleOpenURL = async (event: { url: string }) => {
    try {
      if (Platform.OS === 'ios') SafariView.dismiss()

      this.setState({ loading: true })
      await this.props.getAccessTokenAsync(event)
    } catch (err) {
      this.setState({ loading: false })
      throw err
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/brand/logo.png')}
          style={styles.logo}
        />
        {this.state.loading
          ? <ActivityIndicator size="large" />
          : <SubmitButton active onPress={this._authorize} title="LOGIN" />}
      </View>
    )
  }
}

export default connect(null, authActions)(SplashHome)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    marginBottom: 40,
  },
})
