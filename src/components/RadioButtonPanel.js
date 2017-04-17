//@flow

import React from 'react'
import { StyleSheet, View } from 'react-native'

import RadioButton from './RadioButton'

type RadioOption = {
  label: string,
  value: string,
};

type Props = {
  // $FlowIssue Object.values is not type inferred by flow (at render site)
  buttons: Array<RadioOption>,
  onSelect: Function,
  selected: string,
};

const RadioButtonPanel = ({ buttons, onSelect, selected }: Props) => {
  return (
    <View style={styles.container}>
      {buttons.map((button, i) => {
        return (
          <RadioButton
            key={i}
            onPress={button => onSelect(button)}
            primaryText={button.label}
            selected={button.value === selected}
            value={button.value}
          />
        )
      })}
    </View>
  )
}

export default RadioButtonPanel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 15,
  },
})
