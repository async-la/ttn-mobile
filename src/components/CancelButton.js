//@flow

import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { DARK_GREY } from '../constants/colors'

type Props = {
  onPress: () => void,
  style: Object,
};

const CancelButton = ({ onPress, style }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, style]}>Cancel</Text>
    </TouchableOpacity>
  )
}

export default CancelButton

const styles = StyleSheet.create({
  button: {},
  text: {
    color: DARK_GREY,
  },
})
