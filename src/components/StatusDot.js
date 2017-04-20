//@flow

import React from 'react'
import { StyleSheet, View } from 'react-native'

import { GREY, ORANGE, BRIGHT_GREEN } from '../constants/colors'

type Props = {
  up: boolean,
}

const StatusDot = ({ up }: Props) => {
  return <View style={[styles.dot, up && styles.up]} />
}

export default StatusDot

const styles = StyleSheet.create({
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: ORANGE,
    borderColor: GREY,
  },
  up: {
    backgroundColor: BRIGHT_GREEN,
  },
})
