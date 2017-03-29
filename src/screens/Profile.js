//@flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'

const randomColorValue = () => Math.floor(Math.random() * 255)
const randomColor = `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`

export default class Profile extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: randomColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>I'm your profile!</Text>
      </View>
    )
  }
}
