//@flow
import AppNavigator from './navigator'
import type { Action } from '../types.js'

// @TODO can we type this better or get type from react-navigation [zack]
export type State = {
  routes: Array<Object>,
  index: number,
};

export default (state, action) => {
  const appNavigatorState = AppNavigator.router.getStateForAction(
    action,
    state
  )
  return appNavigatorState || state
}
