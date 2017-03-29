// @flow

import { combineReducers } from 'redux'

import app, { type State as AppState } from './app/reducer'
import auth, { type State as AuthState } from './auth/reducer'
import device, { type State as DeviceState } from './device/reducer'
import navigator, { type State as NavigatorState } from './navigation/reducer'

export default combineReducers({ app, auth, device, navigator })

export type State = {
  app: AppState,
  auth: AuthState,
  device: DeviceState,
  navigator: NavigatorState,
};
