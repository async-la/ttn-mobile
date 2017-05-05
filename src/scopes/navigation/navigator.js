// @flow
import React from 'react'
import { TabNavigator, TabView, StackNavigator } from 'react-navigation'

import ApplicationData from '../../screens/ApplicationData'
import ApplicationList from '../../screens/ApplicationList'
import ApplicationOverview from '../../screens/ApplicationOverview'
import ApplicationSettings from '../../screens/ApplicationSettings'
import DeviceList from '../../screens/DeviceList'
import DeviceOverview from '../../screens/DeviceOverview'
import DeviceSettings from '../../screens/DeviceSettings'
import DeviceDetailPlaceholder from '../../screens/DeviceDetailPlaceholder'
import GatewayList from '../../screens/GatewayList'
import GatewayOverview from '../../screens/GatewayOverview'
import GatewayDetailPlaceholder from '../../screens/GatewayDetailPlaceholder'
import ProfileOverview from '../../screens/ProfileOverview'

import IconAccount from '../../components/IconAccount'
import IconApplications from '../../components/IconApplications'
import IconGateways from '../../components/IconGateways'

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

import { BLUE, LIGHT_BLUE, GREY, WHITE } from '../../constants/colors'
import { LATO_REGULAR } from '../../constants/fonts'

const ApplicationDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: ApplicationOverview,
      path: '/overview',
      navigationOptions: {
        tabBarLabel: OVERVIEW_LABEL,
      },
    },
    [DEVICE_LIST]: {
      screen: DeviceList,
      path: '/devices',
      navigationOptions: {
        tabBarLabel: DEVICES_LABEL,
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
      screen: ApplicationData,
      path: '/data',
      navigationOptions: {
        tabBarLabel: DATA_LABEL,
      },
    },
    [SETTINGS]: {
      screen: ApplicationSettings,
      path: '/settings',
      navigationOptions: {
        tabBarLabel: SETTINGS_LABEL,
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
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      style: {
        backgroundColor: BLUE,
      },
      indicatorStyle: {
        backgroundColor: WHITE,
      },
      scrollEnabled: true,
    },
  }
)

const DeviceDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: DeviceOverview,
      navigationOptions: {
        tabBarLabel: OVERVIEW_LABEL,
      },
    },
    [DATA]: {
      screen: DeviceDetailPlaceholder,
      navigationOptions: {
        tabBarLabel: DATA_LABEL,
      },
    },
    [SETTINGS]: {
      screen: DeviceSettings,
      navigationOptions: {
        tabBarLabel: SETTINGS_LABEL,
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
      labelStyle: {
        fontFamily: LATO_REGULAR,
        color: BLUE,
      },
      style: {
        backgroundColor: WHITE,
      },
      indicatorStyle: {
        backgroundColor: BLUE,
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
      screen: GatewayOverview,
      navigationOptions: {
        tabBarLabel: OVERVIEW_LABEL,
      },
    },
    [TRAFFIC]: {
      screen: GatewayDetailPlaceholder,
      navigationOptions: {
        tabBarLabel: TRAFFIC_LABEL,
      },
    },
    [SETTINGS]: {
      screen: GatewayDetailPlaceholder,
      navigationOptions: {
        tabBarLabel: SETTINGS_LABEL,
      },
    },
  },
  {
    backBehavior: 'none',
    order: [OVERVIEW, TRAFFIC, SETTINGS],
    tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    lazyLoad: true,
    animationEnabled: true,
    swipeEnabled: true,
    pressOpacity: 0.2,
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      style: {
        backgroundColor: BLUE,
      },
      indicatorStyle: {
        backgroundColor: WHITE,
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

const Profile = StackNavigator({
  [PROFILE]: {
    screen: ProfileOverview,
    path: '/',
  },
})
// Main app navigator. Define bottom tabs here
const AppNavigator = TabNavigator(
  {
    [APPLICATIONS]: {
      screen: Applications,
      path: '/',
      navigationOptions: {
        tabBarLabel: APPLICATIONS_LABEL,
        tabBarIcon: ({ tintColor, focused }) => (
          <IconApplications fill={focused ? LIGHT_BLUE : GREY} />
        ),
      },
    },
    [GATEWAYS]: {
      screen: Gateways,
      path: '/gateways',
      navigationOptions: {
        tabBarLabel: GATEWAYS_LABEL,
        tabBarIcon: ({ tintColor, focused }) => (
          <IconGateways fill={focused ? LIGHT_BLUE : GREY} />
        ),
      },
    },
    [PROFILE]: {
      screen: Profile,
      path: '/profile',
      navigationOptions: {
        tabBarLabel: PROFILE_LABEL,
        tabBarIcon: ({ tintColor, focused }) => (
          <IconAccount fill={focused ? LIGHT_BLUE : GREY} />
        ),
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
