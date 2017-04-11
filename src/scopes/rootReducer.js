// @flow

import { combineReducers } from 'redux'

import app, { type State as AppState } from './app/reducer'
import auth, { type State as AuthState } from './auth/reducer'
import content, { type State as ContentState } from './content/reducer'
import device, { type State as DeviceState } from './device/reducer'
import navigator, { type State as NavigatorState } from './navigation/reducer'
import notification, {
  type State as NotificationState,
} from './notification/reducer'

export default combineReducers({
  app,
  auth,
  content,
  device,
  navigator,
  notification,
})

export type State = {
  app: AppState,
  auth: AuthState,
  content: ContentState,
  device: DeviceState,
  navigator: NavigatorState,
  notification: NotificationState,
};
