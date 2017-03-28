// @flow

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as applicationActions from './actions'

export const injectApplicationActions = connect(null, dispatch => ({
  applicationActions: bindActionCreators(applicationActions, dispatch),
}))
