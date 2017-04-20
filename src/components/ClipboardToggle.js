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
import { DARK_GREY, LIGHT_GREY, GREY } from '../constants/colors'

type Props = {
  type: 'password' | 'hex',
  value: string,
}

type State = {
  currentState: {
    type: string,
    value: string,
  },
  copied: boolean,
  passwordVisible: boolean,
}

export default class ClipboardToggle extends Component {
  prop: Props
  state: State

  state = {
    type: 'hex',
    currentState: {
      type: '',
      value: '',
    },
    copied: false,
    passwordVisible: false,
  }
  componentDidMount() {
    !this.props.password && this._toggleKeyFormat()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        currentState: {
          type: 'hex',
          value: splitHex(nextProps.value),
        },
      })
    }
  }

  _togglePassword = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  }
  _toggleKeyFormat = () => {
    switch (this.state.currentState.type) {
      case 'hex':
        this.setState({
          currentState: {
            type: 'msb',
            value: hexToMsb(this.props.value),
          },
        })
        break
      case 'msb':
        this.setState({
          currentState: {
            type: 'lsb',
            value: hexToLsb(this.props.value),
          },
        })
        break
      case 'lsb':
        this.setState({
          currentState: {
            type: 'hex',
            value: splitHex(this.props.value),
          },
        })
        break
      default:
        this.setState({
          currentState: {
            type: 'hex',
            value: splitHex(this.props.value),
          },
        })
        break
    }
  }
  _copyToClipboard = () => {
    if (this.props.password) {
      Clipboard.setString(this.props.value)
    } else {
      Clipboard.setString(this.state.currentState.value)
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
          <Text style={styles.inputText}>{this.state.currentState.value}</Text>
        </ScrollView>
        <View style={styles.clipBoardContainer}>
          <TouchableOpacity
            onPress={this._copyToClipboard}
            style={styles.clipBoardToggle}
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
  _renderPasswordClipboard() {
    return (
      <View style={[styles.container, { ...this.props.style }]}>
        <View style={styles.toggleSwitchContainer}>
          <TouchableOpacity
            onPress={this._togglePassword}
            style={styles.toggleSwitch}
          >
            <Ionicons
              name={this.state.passwordVisible ? 'ios-eye-off' : 'ios-eye'}
              size={20}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.inputText}>
            {this.state.passwordVisible
              ? this.props.value
              : this.props.value.replace(/(.)/g, '•')}
          </Text>
        </ScrollView>
        <View style={styles.clipBoardContainer}>
          <TouchableOpacity
            onPress={this._copyToClipboard}
            style={styles.clipBoardToggle}
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
    return this.props.password
      ? this._renderPasswordClipboard()
      : this._renderHexkeyClipboard()
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
  clipBoardContainer: {
    borderLeftWidth: 1,
    borderColor: GREY,
  },
  clipBoardToggle: {
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
