// @flow

import { combineReducers } from 'redux'

import app, { type State as AppState } from './app/reducer'
import auth, { type State as AuthState } from './auth/reducer'
import navigator, { type State as NavigatorState } from './navigation/reducer'

export default combineReducers({ app, auth, navigator })

export type State = {
  app: AppState,
  auth: AuthState,
  navigator: NavigatorState,
};
