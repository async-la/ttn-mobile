// @flow

import { combineReducers } from 'redux'

import app, { type State as AppState } from './app/reducer'
import auth, { type State as AuthState } from './auth/reducer'
import navigators, {
  type State as NavigatorsState,
} from './navigators/reducer'

export default combineReducers({ app, auth, navigators })

export type State = {
  app: AppState,
  auth: AuthState,
  navigators: NavigatorsState,
};
