// @flow

import { combineReducers } from 'redux'

import auth from './auth/reducer'
import content from './content/reducer'
import navigator from './navigation/reducer'

export default combineReducers({ auth, content, navigator })
