// @flow
import React from 'react'
import { TabNavigator, TabView, StackNavigator } from 'react-navigation'

import ApplicationList from '../../screens/ApplicationList'
import ApplicationOverview from '../../screens/ApplicationOverview'
import DeviceList from '../../screens/DeviceList'
import DeviceDetailPlaceholder from '../../screens/DeviceDetailPlaceholder'
import GatewayList from '../../screens/GatewayList'
import GatewayDetailPlaceholder from '../../screens/GatewayDetailPlaceholder'
import Profile from '../../screens/Profile'
// import TestScreen from '../../screens/TestScreen'
import tabBarTopLabel from '../../components/navigation/tabBarTopLabel'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Zocial from 'react-native-vector-icons/Zocial'

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

import { BLUE } from '../../constants/colors'

const ApplicationDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: ApplicationOverview,
      path: '/overview',
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(OVERVIEW_LABEL),
        },
      },
    },
    [DEVICE_LIST]: {
      screen: DeviceList,
      path: '/devices',
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(DEVICES_LABEL),
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
      screen: Profile,
      path: '/data',
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(DATA_LABEL),
        },
      },
    },
    [SETTINGS]: {
      screen: Profile,
      path: '/settings',
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(SETTINGS_LABEL),
        },
      },
    },
  },
  {
    backBehavior: 'none',
    order: [OVERVIEW, DEVICE_LIST, DATA, SETTINGS],
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    lazyLoad: true,
    animationEnabled: true,
    swipeEnabled: true,
    pressOpacity: 0.2,
    tabBarOptions: {
      style: {
        backgroundColor: BLUE,
      },
      indicatorStyle: {
        backgroundColor: 'white',
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
          label: tabBarTopLabel(OVERVIEW_LABEL),
        },
      },
    },
    [DATA]: {
      screen: DeviceDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(DATA_LABEL),
        },
      },
    },
    [SETTINGS]: {
      screen: DeviceDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(SETTINGS_LABEL),
        },
      },
    },
  },
  {
    animationEnabled: true,
    backBehavior: 'none',
    lazyLoad: true,
    order: [OVERVIEW, DATA, SETTINGS],
    scrollEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: BLUE,
      },
      indicatorStyle: {
        backgroundColor: 'white',
      },
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
          label: tabBarTopLabel(OVERVIEW_LABEL),
        },
      },
    },
    [TRAFFIC]: {
      screen: GatewayDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(TRAFFIC_LABEL),
        },
      },
    },
    [SETTINGS]: {
      screen: GatewayDetailPlaceholder,
      navigationOptions: {
        tabBar: {
          label: tabBarTopLabel(SETTINGS_LABEL),
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
      style: {
        backgroundColor: BLUE,
      },
      indicatorStyle: {
        backgroundColor: 'white',
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
const AppNavigator = TabNavigator(
  {
    [APPLICATIONS]: {
      screen: Applications,
      path: '/',
      navigationOptions: {
        tabBar: {
          label: APPLICATIONS_LABEL,
          icon: ({ tintColor, focused }) => (
            <Zocial
              name="buffer"
              size={20}
              style={{ color: focused ? BLUE : 'grey' }}
            />
          ),
        },
      },
    },
    [GATEWAYS]: {
      screen: Gateways,
      path: '/gateways',
      navigationOptions: {
        tabBar: {
          label: GATEWAYS_LABEL,
          icon: ({ tintColor, focused }) => (
            <MaterialIcons
              name="router"
              size={30}
              style={{ color: focused ? BLUE : 'grey' }}
            />
          ),
        },
      },
    },
    [PROFILE]: {
      screen: Profile,
      path: '/profile',
      navigationOptions: {
        tabBar: {
          label: PROFILE_LABEL,
          icon: ({ tintColor, focused }) => (
            <MaterialIcons
              name="person"
              size={30}
              style={{ color: focused ? BLUE : 'grey' }}
            />
          ),
        },
      },
    },
  },
  {
    order: [APPLICATIONS, GATEWAYS, PROFILE],
    lazyLoad: true,
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
    },
  }
)

export default AppNavigator
