//@flow
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { GREEN, GREY, LIGHT_GREY } from '../constants/colors'

import FormLabel from './FormLabel'

type Props = {
  selected?: boolean,
  primaryText: string,
  secondaryText?: string,
  onPress?: Function,
  style?: Object,
};

const CheckBox = (
  { selected, primaryText, secondaryText, onPress, style }: Props
) => {
  return (
    <TouchableOpacity style={[styles.option, style]} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.selected]} />
      <FormLabel primaryText={primaryText} secondaryText={secondaryText} />
    </TouchableOpacity>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 20,
  },
  selected: {
    backgroundColor: GREEN,
  },
  option: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
