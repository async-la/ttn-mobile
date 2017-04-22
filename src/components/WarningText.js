//@flow
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { DARK_ORANGE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

type Props = {
  children?: string,
  style?: Object,
}

export default ({ children, style }: Props) => {
  return <Text style={[styles.warning, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  warning: {
    fontFamily: LATO_REGULAR,
    color: DARK_ORANGE,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
})
