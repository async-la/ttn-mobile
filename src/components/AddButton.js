// @flow

import React from 'react'
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { BLUE, GREY, WHITE } from '../constants/colors'

const AddButton = (props: Object) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.header && styles.isHeader,
        props.disabled && styles.inactive,
      ]}
      onPress={props.onPress}
    >
      {props.inProgress
        ? <ActivityIndicator color={BLUE} />
        : <Ionicons
          name="ios-add"
          size={props.header ? 25 : 35}
          style={[
              styles.icon,
              props.header && styles.iconHeader,
              props.disabled && styles.inactiveIcon,
            ]}
          />}

    </TouchableOpacity>
  )
}

export default AddButton

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
}
