// @flow

import React from 'react'
import { Text, View } from 'react-native'

import {
  BLUE,
  MID_GREY,
  GREY,
  LIGHT_GREY,
  DARK_ORANGE,
  LIGHT_BLUE,
  LIGHT_ORANGE,
  ORANGE,
} from '../constants/colors'

import { LATO_REGULAR } from '../constants/fonts'

type Props = {
  center?: boolean,
  children?: React.Element<any>,
  grey?: boolean,
  orange?: boolean,
  style?: Object,
}

const TagLabel = (props: Props) => {
  let labelColor = {}
  if (props.grey) {
    labelColor.backgroundColor = LIGHT_GREY
    labelColor.borderBottomColor = GREY
  } else if (props.orange) {
    labelColor.backgroundColor = LIGHT_ORANGE
    labelColor.borderBottomColor = ORANGE
  } else {
    labelColor.backgroundColor = LIGHT_BLUE
    labelColor.borderBottomColor = BLUE
  }

  let textColor
  if (props.grey) textColor = MID_GREY
  else if (props.orange) textColor = DARK_ORANGE
  else textColor = BLUE

  return (
    <View
      style={[
        styles.container,
        {
          ...labelColor,
          alignSelf: props.center ? 'center' : 'flex-start',
        },
        props.style,
      ]}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontFamily: LATO_REGULAR,
          color: textColor,
        }}
      >
        {props.children}
      </Text>
    </View>
  )
}

export default TagLabel

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 3,
    height: 30,
    padding: 10,
  },
}
