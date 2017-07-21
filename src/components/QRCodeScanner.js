//@flow
import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

import Camera from 'react-native-camera'

type Props = {
  onDismiss: Function,
  onBarCodeRead: Function,
}

export default class QRCodeScanner extends Component {
  props: Props
  render() {
    const { onDismiss, onBarCodeRead } = this.props

    return (
      <Camera
        style={styles.container}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={onBarCodeRead}
      >
        <Text style={styles.button} onPress={onDismiss}>BACK</Text>
      </Camera>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
})
