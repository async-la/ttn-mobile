// @flow

import React from 'react'
import { Text } from 'react-native'

import { LATO_REGULAR } from '../../constants/fonts'
import { WHITE } from '../../constants/colors'

export default (formattedMessage): React.Element<any> => (
  <Text
    style={{
      color: WHITE,
      textAlign: 'center',
      fontSize: 14,
      margin: 8,
      backgroundColor: 'transparent',
      fontFamily: LATO_REGULAR,
    }}
  >
    {formattedMessage}
  </Text>
)
