// @flow

import React from 'react'
import { Text, View } from 'react-native'

import { BLACK, LIGHT_GREY, WHITE } from '../constants/colors'

type Props = {
  heading: string,
  headingRight?: React.Element<any>,
  children?: React.Element<any>,
}

const ContentBlock = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          {typeof props.heading === 'string'
            ? props.heading.toUpperCase()
            : props.heading}
        </Text>
        {props.headingRight}
      </View>
      <View style={styles.content}>
        {props.children}
      </View>
    </View>
  )
}

export default ContentBlock

const styles = {
  container: {
    backgroundColor: WHITE,
    margin: 10,
  },
  content: {
    padding: 10,
  },
  heading: {
    backgroundColor: LIGHT_GREY,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 18,
    letterSpacing: 2,
    color: BLACK,
  },
}
