// @flow
import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import SafariView from 'react-native-safari-view'
import SubmitButton from '../components/SubmitButton'
import { connect } from 'react-redux'

import { AUTHORIZATION_URI } from '../constants/apiEndpoints'
import { BLACK, MID_GREY } from '../constants/colors'
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
        <View style={styles.heading}>
          <Text style={styles.appTitle}>TTN Mobile</Text>
          <Image
            resizeMode="contain"
            source={require('../assets/brand/logo.png')}
            style={styles.logo}
          />
          {this.state.loading
            ? <ActivityIndicator size="large" color={BLACK} />
            : <SubmitButton active onPress={this._authorize} title="LOGIN" />}
        </View>
        <View>
          <Text style={[styles.disclaimer, { marginBottom: 10 }]}>
            Built by TTN Los Angeles
          </Text>
          <Text style={styles.disclaimer}>
            TTN Mobile is not affiliated, associated, or in any way officially connected with The Things Network Foundation, or any of its subsidiaries or its affiliates.
          </Text>
        </View>
      </View>
    )
  }
}

export default connect(null, authActions)(SplashHome)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  heading: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  logo: {
    height: 150,
    marginBottom: 40,
  },
  disclaimer: {
    color: MID_GREY,
    textAlign: 'center',
    fontSize: 10,
  },
})
