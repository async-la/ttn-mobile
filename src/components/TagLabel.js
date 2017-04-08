// @flow

import React from 'react'
import { Text, View } from 'react-native'

import {
  BLUE,
  DARK_ORANGE,
  LIGHT_BLUE,
  LIGHT_ORANGE,
  ORANGE,
} from '../constants/colors'

import { LATO_REGULAR } from '../constants/fonts'

type Props = {
  center?: boolean,
  children?: React.Element<any>,
  orange?: boolean,
};

const TagLabel = (props: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.orange ? LIGHT_ORANGE : LIGHT_BLUE,
          borderBottomColor: props.orange ? ORANGE : BLUE,
          alignSelf: props.center ? 'center' : 'flex-start',
        },
      ]}
    >
      <Text
        style={{
          fontFamily: LATO_REGULAR,
          color: props.orange ? DARK_ORANGE : BLUE,
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
