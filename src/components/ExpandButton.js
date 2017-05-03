//@flow

import React, { Component } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { BLUE } from '../constants/colors'

type Props = {
  onPress?: Function,
}

type State = {
  activated: boolean,
  animation: Object,
  inProgress: boolean,
  rotation: string,
}

class ExpandButton extends Component {
  state: State = {
    activated: false,
    animation: new Animated.Value(0),
    inProgress: false,
    rotation: '0deg',
  }
  props: Props
  _onPress = async () => {
    if (this.state.inProgress) return
    const { activated } = this.state

    await this.setState({
      inProgress: true,
      rotation: this.state.animation.interpolate({
        inputRange: [0, 90],
        outputRange: activated ? ['90deg', '0deg'] : ['0deg', '90deg'],
      }),
      activated: !activated,
    })

    Animated.timing(this.state.animation, {
      toValue: 90,
      duration: 250,
    }).start(() => {
      this.setState({
        inProgress: false,
        animation: new Animated.Value(0),
      })
    })
    this.props.onPress && this.props.onPress(activated)
  }
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ rotate: this.state.rotation }] },
          ]}
        >
          <Ionicons
            name={'ios-arrow-dropright'}
            size={30}
            style={styles.icon}
          />
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

export default ExpandButton

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: BLUE,
    paddingTop: 3,
  },
})
