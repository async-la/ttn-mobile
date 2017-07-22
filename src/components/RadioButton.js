//@flow
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { BLACK, GREY, LIGHT_GREY } from '../constants/colors'

import FormLabel from './FormLabel'

const BUTTON_SIZE = 20

type Props = {
  selected?: boolean,
  primaryText: string,
  secondaryText?: string,
  onPress?: Function,
  style?: Object,
  value: string,
}

const RadioButton = ({
  selected,
  primaryText,
  secondaryText,
  onPress,
  style,
  value,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.selectedOption, style]}
      onPress={() => onPress && onPress(value)}
    >
      <View style={[styles.button, selected && styles.selectedButton]} />
      <FormLabel
        primaryText={primaryText}
        primaryTextStyle={styles.labelText}
        secondaryText={secondaryText}
        style={styles.label}
      />
    </TouchableOpacity>
  )
}

export default RadioButton

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 0,
  },
  labelText: {
    fontWeight: 'normal',
  },
  selectedButton: {
    backgroundColor: BLACK,
  },
  option: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: GREY,
  },
  selectedOption: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 5,
  },
})
