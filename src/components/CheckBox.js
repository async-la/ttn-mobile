//@flow
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { BLACK, GREY, LIGHT_GREY, WHITE } from '../constants/colors'

import FormLabel from './FormLabel'

type Props = {
  selected?: boolean,
  primaryText: string,
  secondaryText?: string,
  onPress?: Function,
  style?: Object,
}

const CheckBox = ({
  selected,
  primaryText,
  secondaryText,
  onPress,
  style,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.option, style]} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.selected]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <FormLabel
        primaryText={primaryText}
        secondaryText={secondaryText}
        style={secondaryText ? styles.multiLine : styles.oneLine}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: BLACK,
  },
  oneLine: {
    marginTop: undefined,
    flexWrap: 'wrap',
    flex: 1,
  },
  multiLine: {
    flexWrap: 'wrap',
    flex: 1,
  },
  option: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
