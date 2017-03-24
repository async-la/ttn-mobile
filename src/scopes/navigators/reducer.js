// @flow

import Applications from '../../screens/Applications'
import ApplicationsTest from '../../screens/ApplicationsTest'
import { TabNavigator, StackNavigator } from 'react-navigation'

export const AppNavigator = TabNavigator({
    Applications: {
      screen: Applications
    },
    Gateways: {
      screen: StackNavigator({
        ApplicationsTest: {
          screen: ApplicationsTest
        }
      })
    }
})

export default (state = {}, action) => {
  const appNavigatorState = AppNavigator.router.getStateForAction(action, state.appNavigatorState)
  //@TODO: review performance implications, make sure it works
  if (appNavigatorState === state.appNavigatorState) return state
  return {
    appNavigatorState: appNavigatorState || state.appNavigatorState
  }
}
