// @flow

import { combineReducers } from 'redux'

import app from './app/reducer'
import auth from './auth/reducer'
import navigators from './navigators/reducer'

export default combineReducers({ app, auth, navigators })
