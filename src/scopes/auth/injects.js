// @flow

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from './actions'

export const injectAuthActions = connect(
  state => ({}),
  (dispatch, props) => {
    return {}
  }
)
