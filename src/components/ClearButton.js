// @flow

import React from 'react'
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { BLUE, GREY, WHITE } from '../constants/colors'

const ClearButton = ({
  disabled,
  header,
  inProgress,
  shadow = true,
  onPress,
}: Object) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        shadow && styles.shadow,
        header && styles.isHeader,
        disabled && styles.inactive,
        header && shadow && styles.headerShadow,
      ]}
      onPress={onPress}
    >
      {inProgress
        ? <ActivityIndicator color={BLUE} />
        : <Ionicons
            name="ios-refresh"
            size={header ? 25 : 35}
            style={[
              styles.icon,
              header && styles.iconHeader,
              disabled && styles.inactiveIcon,
            ]}
          />}
    </TouchableOpacity>
  )
}

export default ClearButton

const styles = {
  button: {
    position: 'absolute',
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    bottom: 22,
    right: 22,
    width: 44,
    height: 44,
    backgroundColor: BLUE,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactive: {
    backgroundColor: GREY,
    borderColor: GREY,
  },
  inactiveIcon: {
    color: WHITE,
  },
  isHeader: {
    position: 'relative',
    bottom: undefined,
    right: undefined,
    width: 25,
    height: 25,
    backgroundColor: WHITE,
    borderColor: BLUE,
    borderWidth: 1,
  },
  icon: {
    color: WHITE,
    backgroundColor: 'transparent',
  },
  iconHeader: {
    color: BLUE,
  },
  shadow: {
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerShadow: {
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
}
