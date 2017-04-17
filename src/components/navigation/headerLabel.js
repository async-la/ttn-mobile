// @flow

import React from 'react'
import { Text } from 'react-native'

import { LATO_REGULAR } from '../../constants/fonts'

export default (formattedMessage): React.Element<any> => (
  <Text
    style={{
      backgroundColor: 'transparent',
      color: 'black',
      fontFamily: LATO_REGULAR,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 8,
    }}
  >
    {formattedMessage}
  </Text>
)
