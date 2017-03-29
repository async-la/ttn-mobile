//@flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'

const randomColorValue = () => Math.floor(Math.random() * 255)
const randomColor = `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`

export default class TestScreen extends Component {
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
        <Text>{`Testing...${this.props.navigation.state.params}`}</Text>
      </View>
    )
  }
}
