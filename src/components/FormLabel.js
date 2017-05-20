//@flow

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DARK_GREY, MID_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

type Props = {
  primaryText: string,
  primaryTextStyle?: Object,
  secondaryText?: string,
  style?: Object | Array<Object>,
}

const FormLabel = ({
  primaryText,
  primaryTextStyle,
  secondaryText,
  style,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.descriptionPrimary, primaryTextStyle]}>
        {primaryText}
      </Text>
      {secondaryText &&
        <Text style={styles.descriptionSecondary}>{secondaryText}</Text>}
    </View>
  )
}

export default FormLabel

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  descriptionPrimary: {
    color: DARK_GREY,
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
  },
  descriptionSecondary: {
    color: MID_GREY,
    fontFamily: LATO_REGULAR,
    marginTop: 5,
  },
})
