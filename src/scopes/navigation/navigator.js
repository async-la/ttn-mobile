// @flow
import { TabNavigator, TabView, StackNavigator } from 'react-navigation'

import ApplicationList from '../../screens/ApplicationList'
import ApplicationDetailPlaceholder
  from '../../screens/ApplicationDetailPlaceholder'
import DeviceList from '../../screens/DeviceList'
import DeviceDetailPlaceholder from '../../screens/DeviceDetailPlaceholder'
import GatewayList from '../../screens/GatewayList'
import GatewayDetailPlaceholder from '../../screens/GatewayDetailPlaceholder'
import Profile from '../../screens/Profile'
import TestScreen from '../../screens/TestScreen'

import {
  APPLICATIONS,
  APPLICATIONS_TAB,
  APPLICATION_DETAIL,
  APPLICATION_LIST,
  DATA,
  DEVICE_DETAIL,
  DEVICE_LIST,
  DEVICES,
  GATEWAYS,
  GATEWAYS_TAB,
  GATEWAY_LIST,
  GATEWAY_DETAIL,
  OVERVIEW,
  PROFILE,
  PROFILE_TAB,
  SETTINGS,
  TRAFFIC,
} from './constants'
import { LATO_REGULAR, LEAGUE_SPARTAN } from '../../constants/fonts'

const ApplicationDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: ApplicationDetailPlaceholder,
      path: '/overview',
    },
    [DEVICE_LIST]: {
      screen: DeviceList,
      path: '/devices',
      navigationOptions: {
        tabBar: {
          label: DEVICES,
        },
      },
    },

    // @NOTE: Are we going to implement PayloadFunctions and Integrations? [dan]
    // PayloadFunctions: {
    //   screen: TestScreen,
    //   path: '/payload',
    // },
    // Integrations: {
    //   screen: TestScreen,
    //   path: '/integrations',
    // },

    [DATA]: {
      screen: ApplicationDetailPlaceholder,
      path: '/data',
    },
    [SETTINGS]: {
      screen: ApplicationDetailPlaceholder,
      path: '/settings',
    },
  },
  {
    backBehavior: 'none',
    order: [OVERVIEW, DEVICE_LIST, DATA, SETTINGS],
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    pressOpacity: 0.2,
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      scrollEnabled: true,
    },
  }
)

const DeviceDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: DeviceDetailPlaceholder,
    },
    [DATA]: {
      screen: DeviceDetailPlaceholder,
    },
    [SETTINGS]: {
      screen: DeviceDetailPlaceholder,
    },
  },
  {
    backBehavior: 'none',
    order: [OVERVIEW, DATA, SETTINGS],
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      scrollEnabled: true,
    },
  }
)

const ApplicationsTab = StackNavigator({
  [APPLICATION_LIST]: {
    screen: ApplicationList,
    path: '/',
    navigationOptions: {
      title: APPLICATIONS,
    },
  },
  [APPLICATION_DETAIL]: {
    screen: ApplicationDetail,
  },
  [DEVICE_DETAIL]: {
    screen: DeviceDetail,
  },
})

const GatewayDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: GatewayDetailPlaceholder,
    },
    [TRAFFIC]: {
      screen: GatewayDetailPlaceholder,
    },
    [SETTINGS]: {
      screen: GatewayDetailPlaceholder,
    },
  },
  {
    backBehavior: 'none',
    order: [OVERVIEW, TRAFFIC, SETTINGS],
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    pressOpacity: 0.2,
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      scrollEnabled: true,
    },
  }
)

const GatewaysTab = StackNavigator({
  [GATEWAY_LIST]: {
    screen: GatewayList,
    path: '/',
    navigationOptions: {
      title: GATEWAYS,
    },
  },
  [GATEWAY_DETAIL]: {
    screen: GatewayDetail,
    path: '/gatewaydetail',
  },
})

// Main app navigator. Define bottom tabs here
export default (AppNavigator = TabNavigator(
  {
    [APPLICATIONS_TAB]: {
      screen: ApplicationsTab,
      path: '/',
      navigationOptions: {
        tabBar: {
          label: APPLICATIONS,
        },
      },
    },
    [GATEWAYS_TAB]: {
      screen: GatewaysTab,
      path: '/gateways',
      navigationOptions: {
        tabBar: {
          label: GATEWAYS,
        },
      },
    },
    [PROFILE_TAB]: {
      screen: Profile,
      path: '/profile',
      navigationOptions: {
        tabBar: {
          label: PROFILE,
        },
      },
    },
  },
  {
    order: [APPLICATIONS_TAB, GATEWAYS_TAB, PROFILE_TAB],
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
  }
))
