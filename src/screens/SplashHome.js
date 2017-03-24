// @flow
import React, { Component } from 'react'
import { Linking, Text, View } from 'react-native'

import { injectAuthActions } from '../scopes/auth/injects'
import { injectApplicationActions } from '../scopes/content/applications/injects'

import base64 from 'base-64'
import queryString from 'query-string'

class SplashHome extends Component {
  async componentDidMount() {
    console.log(this.props)
    Linking.addEventListener('url', this._handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
  }

  _authorize() {
    Linking.openURL('https://account.thethingsnetwork.org/users/authorize?client_id=async-llc&redirect_uri=ttn://oauth&response_type=code')
  }

  _handleOpenURL = async (event) => {
    console.log('event', event)
    let params = event.url.split('?')[1]
    let query = queryString.parse(params)
    console.log('query', query.code)

    const result = await fetch('https://account.thethingsnetwork.org/users/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64.encode('async-llc:1f1f78bf32611b4f22a12e2bc040c2afbd161dffa683a0a3d049292425cd99d2')}`,
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: query.code,
        redirect_uri: "ttn://oauth"
      })
    })

    const json = await result.json()
    console.log('receiveAuth', json)

    this.props.authActions.receiveAuth({
      accessToken: json.access_token,
      accessTokenExpiresAt: Date.now() + json.expires_in * 1000,
      refreshToken: json.refresh_token,
      tokenType: json.token_type,
    })

    const applications = await this.props.applicationActions.getApplications()
    console.log(applications)

  }

  render() {
    return (
      <View>
        <Text onPress={this._authorize}>Login</Text>
      </View>
    )
  }
}

export default injectApplicationActions(injectAuthActions(SplashHome))
