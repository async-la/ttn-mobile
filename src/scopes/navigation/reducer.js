//@flow
import AppNavigator from './navigator'
import _ from 'lodash'

import { RESET_AUTH } from '../auth/types'

import type { Action } from '../types.js'

// @TODO can we type this better or get type from react-navigation [zack]
export type State = {
  routes: Array<Object>,
  index: number,
}

function isDuplicateRoute(originalRoute, newRoute) {
  while (originalRoute && originalRoute.index >= 0) {
    originalRoute = originalRoute.routes[originalRoute.index]
  }

  while (newRoute && newRoute.index >= 0) {
    newRoute = newRoute.routes[newRoute.index]
  }

  if (_.isEqual(originalRoute, newRoute)) {
    console.log('## Duplicate navigation stack push, skipping')
    return true
  } else return false
}

export default (state: ?State, action: Action) => {
  switch (action.type) {
    case RESET_AUTH:
      return AppNavigator.router.getStateForAction(action, null)
    default: {
      const appNavigatorState = AppNavigator.router.getStateForAction(
        action,
        state
      )
      if (isDuplicateRoute(state, appNavigatorState)) return state
      return appNavigatorState || state
    }
  }
}
