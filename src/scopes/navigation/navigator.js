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
  APPLICATION_DETAIL,
  APPLICATION_LIST,
  APPLICATIONS,
  APPLICATIONS_LABEL,
  DATA,
  DATA_LABEL,
  DEVICE_DETAIL,
  DEVICE_LIST,
  DEVICES_LABEL,
  GATEWAY_LIST,
  GATEWAY_DETAIL,
  GATEWAYS,
  GATEWAYS_LABEL,
  OVERVIEW,
  OVERVIEW_LABEL,
  PROFILE,
  PROFILE_LABEL,
  SETTINGS,
  SETTINGS_LABEL,
  TRAFFIC,
  TRAFFIC_LABEL,
} from './constants'
import { LATO_REGULAR, LEAGUE_SPARTAN } from '../../constants/fonts'

const ApplicationDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: ApplicationDetailPlaceholder,
      path: '/overview',
      navigationOptions: {
        tabBar: {
          label: OVERVIEW_LABEL,
        },
      },
    },
    [DEVICE_LIST]: {
      screen: DeviceList,
      path: '/devices',
      navigationOptions: {
        tabBar: {
          label: DEVICES_LABEL,
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
      navigationOptions: {
        tabBar: {
          label: DATA_LABEL,
        },
      },
    },
    [SETTINGS]: {
      screen: ApplicationDetailPlaceholder,
      path: '/settings',
      navigationOptions: {
        tabBar: {
          label: SETTINGS_LABEL,
        },
      },
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
      navigationOptions: {
        tabBar: {
          label: OVERVIEW_LABEL,
        },
      },
    },
    [DATA]: {
      screen: DeviceDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: DATA_LABEL,
        },
      },
    },
    [SETTINGS]: {
      screen: DeviceDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: SETTINGS_LABEL,
        },
      },
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

const Applications = StackNavigator({
  [APPLICATION_LIST]: {
    screen: ApplicationList,
    path: '/',
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
      navigationOptions: {
        tabBar: {
          label: OVERVIEW_LABEL,
        },
      },
    },
    [TRAFFIC]: {
      screen: GatewayDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: TRAFFIC_LABEL,
        },
      },
    },
    [SETTINGS]: {
      screen: GatewayDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: SETTINGS_LABEL,
        },
      },
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

const Gateways = StackNavigator({
  [GATEWAY_LIST]: {
    screen: GatewayList,
    path: '/',
  },
  [GATEWAY_DETAIL]: {
    screen: GatewayDetail,
    path: '/gatewaydetail',
  },
})

// Main app navigator. Define bottom tabs here
export default (AppNavigator = TabNavigator(
  {
    [APPLICATIONS]: {
      screen: Applications,
      path: '/',
      navigationOptions: {
        tabBar: {
          label: APPLICATIONS_LABEL,
        },
      },
    },
    [GATEWAYS]: {
      screen: Gateways,
      path: '/gateways',
      navigationOptions: {
        tabBar: {
          label: GATEWAYS_LABEL,
        },
      },
    },
    [PROFILE]: {
      screen: Profile,
      path: '/profile',
      navigationOptions: {
        tabBar: {
          label: PROFILE_LABEL,
        },
      },
    },
  },
  {
    order: [APPLICATIONS, GATEWAYS, PROFILE],
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
  }
))
