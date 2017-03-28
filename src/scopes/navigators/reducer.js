// @flow

import Applications from '../../screens/Applications'
import ApplicationsTest from '../../screens/ApplicationsTest'
import { TabNavigator, StackNavigator } from 'react-navigation'

// @TODO can we type this better or get type from react-navigation [zack]
export type State = {
  appNavigatorState: {
    routes: Array<Object>,
    index: number,
  },
};

export const AppNavigator = TabNavigator({
  Applications: {
    screen: Applications,
  },
  Gateways: {
    screen: StackNavigator({
      ApplicationsTest: {
        screen: ApplicationsTest,
      },
    }),
  },
})

export default (state = {}, action) => {
  const appNavigatorState = AppNavigator.router.getStateForAction(
    action,
    state.appNavigatorState
  )
  // @TODO: review performance implications, make sure it works
  // since there is only one navigator, we can potentially drop the nesting altogether
  if (appNavigatorState === state.appNavigatorState) return state
  return {
    appNavigatorState: appNavigatorState || state.appNavigatorState,
  }
}
