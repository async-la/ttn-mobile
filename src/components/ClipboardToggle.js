// @flow

import React, { Component } from 'react'
import {
  Clipboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { hexToLsb, hexToMsb, splitHex } from '../utils/payloadConversion'
import { DARK_GREY, LIGHT_GREY, GREY, MID_GREY } from '../constants/colors'

type Props = {
  type: 'base64' | 'hex',
  sensitive: boolean,
  style: Object,
  value: string,
}

type State = {
  currentState: {
    state: string,
    value: string,
  },
  copied: boolean,
  hidden: boolean,
}

export default class ClipboardToggle extends Component {
  static defaultProps = {
    type: 'hex',
    sensitive: false,
    value: '',
    style: {},
  }
  props: Props
  state: State = {
    currentState: {
      state: '',
      value: '',
    },
    copied: false,
    hidden: true,
  }
  componentDidMount() {
    this.props.type === 'hex' && this._toggleKeyFormat()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      const { state } = this.state.currentState
      this.setState({
        currentState: {
          state,
          value: this._formatValue(nextProps.value, state),
        },
      })
    }
  }

  _formatValue(value, format) {
    let formatted

    switch (format) {
      case 'msb':
        formatted = hexToMsb(value)
        break
      case 'lsb':
        formatted = hexToLsb(value)
        break
      case 'hex':
      default:
        formatted = splitHex(value)
    }
    return formatted
  }

  _togglePassword = () => {
    this.setState({ hidden: !this.state.hidden })
  }
  _toggleKeyFormat = () => {
    const { value } = this.props
    const { state } = this.state.currentState

    const formats = ['hex', 'msb', 'lsb']
    const currentIndex = formats.indexOf(state)
    const nextIndex = currentIndex >= formats.length - 1 ? 0 : currentIndex + 1
    this.setState({
      currentState: {
        state: formats[nextIndex],
        value: this._formatValue(value, formats[nextIndex]),
      },
    })
  }
  _copyToClipboard = () => {
    if (this.props.type === 'hex') {
      Clipboard.setString(this.state.currentState.value)
    } else {
      Clipboard.setString(this.props.value)
    }

    this.setState({ copied: true })
    this._clearClipboard()
  }
  _clearClipboard = () => {
    return setTimeout(() => {
      this.setState({ copied: false })
    }, 2000)
  }
  _renderHexkeyClipboard = () => {
    return (
      <View style={[styles.container, { ...this.props.style }]}>
        {this.props.sensitive &&
          <View style={styles.toggleSwitchContainer}>
            <TouchableOpacity
              onPress={this._togglePassword}
              style={styles.toggleSwitch}
            >
              <Ionicons
                name={this.state.hidden ? 'ios-eye' : 'ios-eye-off'}
                size={20}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>}
        <View style={styles.toggleSwitchContainer}>
          <TouchableOpacity
            onPress={this._toggleKeyFormat}
            style={styles.toggleSwitch}
          >
            <Ionicons name="ios-arrow-back" size={15} style={styles.icon} />
            <Text>&nbsp;</Text>
            <Ionicons name="ios-arrow-forward" size={15} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.inputText}>
            {this.props.sensitive && this.state.hidden
              ? this.state.currentState.value.replace(/(.)/g, '•')
              : this.state.currentState.value}
          </Text>
        </ScrollView>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{this.props.type || 'hex'}</Text>
        </View>
        <View style={styles.clipboardContainer}>
          <TouchableOpacity
            onPress={this._copyToClipboard}
            style={styles.clipboardToggle}
          >
            <Ionicons
              name="ios-clipboard-outline"
              size={22}
              style={styles.icon}
            />
          </TouchableOpacity>
          {this.state.copied && <Text style={styles.copiedAlert}>Copied!</Text>}
        </View>
      </View>
    )
  }
  _renderBase64Clipboard() {
    return (
      <View style={[styles.container, { ...this.props.style }]}>
        {this.props.sensitive &&
          <View style={styles.toggleSwitchContainer}>
            <TouchableOpacity
              onPress={this._togglePassword}
              style={styles.toggleSwitch}
            >
              <Ionicons
                name={this.state.hidden ? 'ios-eye' : 'ios-eye-off'}
                size={20}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.inputText}>
            {this.props.sensitive && this.state.hidden
              ? this.props.value.replace(/(.)/g, '•')
              : this.props.value}
          </Text>
        </ScrollView>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{this.props.type || 'hex'}</Text>
        </View>
        <View style={styles.clipboardContainer}>
          <TouchableOpacity
            onPress={this._copyToClipboard}
            style={styles.clipboardToggle}
          >
            <Ionicons
              name="ios-clipboard-outline"
              size={22}
              style={styles.icon}
            />
          </TouchableOpacity>
          {this.state.copied && <Text style={styles.copiedAlert}>Copied!</Text>}
        </View>
      </View>
    )
  }
  render() {
    return this.props.type === 'hex'
      ? this._renderHexkeyClipboard()
      : this._renderBase64Clipboard()
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: GREY,
    height: 50,
  },
  toggleSwitchContainer: {
    borderRightWidth: 1,
    borderColor: GREY,
  },
  toggleSwitch: {
    flexDirection: 'row',
    padding: 15,
    alignSelf: 'center',
    height: '100%',
  },
  labelText: {
    fontSize: 10,
    color: MID_GREY,
    padding: 5,
  },
  clipboardContainer: {
    borderLeftWidth: 1,
    borderColor: GREY,
  },
  clipboardToggle: {
    padding: 15,
    alignSelf: 'center',
    height: '100%',
  },
  copiedAlert: {
    fontSize: 8,
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  icon: {
    color: DARK_GREY,
  },
  inputText: {
    padding: 10,
  },
})
