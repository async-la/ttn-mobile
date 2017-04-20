// @flow

import React from 'react'
import { ActivityIndicator } from 'react-native'

import { connect } from 'react-redux'

export default connect(state => ({
  bootstrapped: state._persist.rehydrated,
}))(props => {
  return props.bootstrapped
    ? props.children
    : <ActivityIndicator style={{ flex: 1 }} size="large" />
})
