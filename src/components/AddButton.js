// @flow

import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { BLUE } from '../constants/colors'

const AddButton = (props: Object) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Ionicons
        name="ios-add"
        size={35}
        style={{ color: 'white', backgroundColor: 'transparent' }}
      />
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
}
