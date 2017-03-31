// @flow
import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { BLUE, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'
import * as authActions from '../scopes/auth/actions'

type Props = {
  getAccessTokenAsync: typeof authActions.getAccessTokenAsync,
};

type State = {
  loading: boolean,
};

class SplashHome extends Component {
  props: Props;
  state: State = {
    loading: false,
  };

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
    this.setState({ loading: false })
  }

  _authorize = () => {
    Linking.openURL(
      'https://account.thethingsnetwork.org/users/authorize?client_id=async-llc&redirect_uri=ttn://oauth&response_type=code'
    )
  };

  _handleOpenURL = async (event: { url: string }) => {
    try {
      this.setState({ loading: true })
      await this.props.getAccessTokenAsync(event)
    } catch (err) {
      this.setState({ loading: false })
      throw err
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/brand/logo.png')}
          style={styles.logo}
        />
        {this.state.loading
          ? <ActivityIndicator size="large" color={BLUE} />
          : <TouchableOpacity style={styles.button} onPress={this._authorize}>
            <Text style={styles.buttonText}>
              <FormattedMessage
                id="app.general.login"
                defaultMessage="LOGIN"
                />
            </Text>
          </TouchableOpacity>}
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
  button: {
    width: '50%',
    backgroundColor: BLUE,
    borderWidth: 20,
    borderColor: BLUE,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: LATO_REGULAR,
    color: WHITE,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
})
