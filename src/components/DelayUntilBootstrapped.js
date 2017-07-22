// @flow

import React from 'react'
import { ActivityIndicator } from 'react-native'

import { connect } from 'react-redux'
import { BLACK } from '../constants/colors'
export default connect(state => ({
  bootstrapped: state.app.bootstrapped,
}))(props => {
  return props.bootstrapped
    ? props.children
    : <ActivityIndicator style={{ flex: 1 }} size="large" color={BLACK} />
})
