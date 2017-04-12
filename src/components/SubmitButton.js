//@flow

import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import { GREEN, GREY, WHITE } from '../constants/colors'

type Props = {
  active: boolean,
  inProgress: boolean,
  onPress: () => void,
  title: string,
};

const SubmitButton = ({ active, inProgress, onPress, title }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, !active && styles.inActive]}
      onPress={active ? onPress : () => {}}
    >
      {inProgress
        ? <ActivityIndicator color={WHITE} />
        : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: GREEN,
    padding: 20,
    width: 150,
    borderRadius: 30,
  },
  inActive: {
    backgroundColor: GREY,
  },
  text: {
    color: WHITE,
    fontWeight: 'bold',
  },
})
