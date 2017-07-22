//@flow

import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import { MID_GREY, BLACK, GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

type Props = {
  active: boolean,
  inProgress?: boolean,
  onPress: () => any,
  style?: Object,
  title: string,
}

const SubmitButton = ({ active, inProgress, onPress, style, title }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, !active && styles.inactive, style]}
      onPress={active ? onPress : () => {}}
    >
      {inProgress
        ? <ActivityIndicator color={WHITE} />
        : <Text style={[styles.text, !active && styles.inactiveText]}>
            {title}
          </Text>}
    </TouchableOpacity>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  inactive: {
    backgroundColor: GREY,
  },
  inactiveText: {
    color: MID_GREY,
  },
  text: {
    color: WHITE,
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
  },
})
