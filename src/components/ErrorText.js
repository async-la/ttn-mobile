//@flow
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { RED } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

type Props = {
  children: string,
  style: Object,
}

export default ({ children, style }: Props) => {
  return <Text style={[styles.invalidMsg, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  invalidMsg: {
    fontFamily: LATO_REGULAR,
    color: RED,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
})
