//@flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import copy from '../constants/copy'

import * as authActions from '../scopes/auth/actions'

const randomColorValue = () => Math.floor(Math.random() * 255)
const randomColor = `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`

class Profile extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: randomColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text onPress={this.props.resetAuth}>
          {copy.LOGOUT}
        </Text>
      </View>
    )
  }
}

export default connect(null, authActions)(Profile)
