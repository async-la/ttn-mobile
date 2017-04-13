// @flow

import { combineReducers } from 'redux'

import app from './app/reducer'
import auth from './auth/reducer'
import content from './content/reducer'
import device from './device/reducer'
import navigator from './navigation/reducer'

export default combineReducers({ app, auth, content, device, navigator })
