// @flow
import React from 'react'
import { Animated, Easing } from 'react-native'

import {
  TabNavigator,
  TabBarBottom,
  TabBarTop,
  StackNavigator,
  NavigationActions,
} from 'react-navigation'

import ApplicationData from '../../screens/ApplicationData'
import ApplicationList from '../../screens/ApplicationList'
import ApplicationOverview from '../../screens/ApplicationOverview'
import ApplicationSettings from '../../screens/ApplicationSettings'
import DeviceList from '../../screens/DeviceList'
import DeviceOverview from '../../screens/DeviceOverview'
import DeviceSettings from '../../screens/DeviceSettings'
import GatewayList from '../../screens/GatewayList'
import GatewayOverview from '../../screens/GatewayOverview'
import GatewaySettings from '../../screens/GatewaySettings'
import GatewayTraffic from '../../screens/GatewayTraffic'
import ProfileOverview from '../../screens/ProfileOverview'

import IconAccount from '../../components/IconAccount'
import Ionicons from 'react-native-vector-icons/Ionicons'

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

import { BLACK, GREY, WHITE } from '../../constants/colors'
import { LATO_REGULAR } from '../../constants/fonts'

const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene, scenes } = sceneProps
    const { index } = scene

    const height = layout.initHeight
    const width = layout.initWidth

    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    })

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0],
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    })

    console.log('PROPS!!', sceneProps)
    console.log('SCENES:', scenes)
    console.log('SCENES LENGTH:', scenes.length)
    console.log('INDEX:', index)

    if (index > 0 && index < scenes.length - 2) return { opacity: 0 } //Hide transitions if we're navigating through multiple screens in a single action
    if (scenes.length - index > 1)
      return { opacity, transform: [{ translateY }] } // if we're adding more than one item to the stack do a vertical transition
    return { opacity, transform: [{ translateX }] } // all other transitions slide in from the right
  },
})

const tabBarComponent = ({ jumpToIndex, ...props }) => (
  <TabBarBottom
    {...props}
    jumpToIndex={index => {
      if (props.navigation.state.index === index) {
        const { routeName } = props.navigation.state.routes[index].routes[0]
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })],
        })
        props.navigation.dispatch(resetAction)
      } else {
        jumpToIndex(index)
      }
    }}
  />
)

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
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    animationEnabled: true,
    swipeEnabled: true,
    pressOpacity: 0.2,
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      style: {
        backgroundColor: BLACK,
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
      screen: ApplicationData,
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
    lazy: true,
    order: [OVERVIEW, DATA, SETTINGS],
    scrollEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
        color: BLACK,
      },
      style: {
        backgroundColor: WHITE,
      },
      indicatorStyle: {
        backgroundColor: BLACK,
      },
    },
  }
)

const Applications = StackNavigator(
  {
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
  },
  { transitionConfig }
)

const GatewayDetail = TabNavigator(
  {
    [OVERVIEW]: {
      screen: GatewayOverview,
      navigationOptions: {
        tabBarLabel: OVERVIEW_LABEL,
      },
    },
    [TRAFFIC]: {
      screen: GatewayTraffic,
      navigationOptions: {
        tabBarLabel: TRAFFIC_LABEL,
      },
    },
    [SETTINGS]: {
      screen: GatewaySettings,
      navigationOptions: {
        tabBarLabel: SETTINGS_LABEL,
      },
    },
  },
  {
    backBehavior: 'none',
    order: [OVERVIEW, TRAFFIC, SETTINGS],
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    animationEnabled: true,
    swipeEnabled: true,
    pressOpacity: 0.2,
    tabBarOptions: {
      labelStyle: {
        fontFamily: LATO_REGULAR,
      },
      style: {
        backgroundColor: BLACK,
      },
      indicatorStyle: {
        backgroundColor: WHITE,
      },
      scrollEnabled: true,
    },
  }
)

const Gateways = StackNavigator(
  {
    [GATEWAY_LIST]: {
      screen: GatewayList,
      path: '/',
    },
    [GATEWAY_DETAIL]: {
      screen: GatewayDetail,
      path: '/gatewaydetail',
    },
  },
  { transitionConfig }
)

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
          <Ionicons
            name={focused ? 'ios-apps' : 'ios-apps-outline'}
            size={36}
          />
        ),
      },
    },
    [GATEWAYS]: {
      screen: Gateways,
      path: '/gateways',
      navigationOptions: {
        tabBarLabel: GATEWAYS_LABEL,
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-wifi' : 'ios-wifi-outline'}
            size={36}
          />
        ),
      },
    },
    [PROFILE]: {
      screen: Profile,
      path: '/profile',
      navigationOptions: {
        tabBarLabel: PROFILE_LABEL,
        tabBarIcon: ({ tintColor, focused }) => (
          <IconAccount fill={focused ? BLACK : GREY} />
        ),
      },
    },
  },
  {
    order: [APPLICATIONS, GATEWAYS, PROFILE],
    lazy: true,
    swipeEnabled: false,
    tabBarComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
    },
  }
)

export default AppNavigator
