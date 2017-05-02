//@flow

import React from 'react'
import { StyleSheet, View } from 'react-native'

import { GREY, ORANGE, BRIGHT_GREEN } from '../constants/colors'

type Props = {
  downColor?: string,
  up: boolean,
  upColor?: string,
}

const StatusDot = ({
  downColor = ORANGE,
  up,
  upColor = BRIGHT_GREEN,
}: Props) => {
  const backgroundColor = up ? upColor : downColor
  return <View style={[styles.dot, { backgroundColor }]} />
}

export default StatusDot

const styles = StyleSheet.create({
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY,
  },
})
