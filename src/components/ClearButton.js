// @flow

import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { BLUE, WHITE } from '../constants/colors'

const ClearButton = (props: Object) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Ionicons
        name="ios-trash-outline"
        size={25}
        style={{ color: WHITE, backgroundColor: 'transparent' }}
      />
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
}
