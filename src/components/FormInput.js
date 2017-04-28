//@flow

import React, { Component } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'

import {
  LIGHT_RED,
  RED,
  DARK_GREY,
  LIGHT_GREY,
  GREY,
} from '../constants/colors'
import { validationTypes } from '../constants/application'

import ErrorText from './ErrorText'

import {
  getValidResponse,
  validateApplicationDescription,
  validateDeviceId,
  validateEmailAddress,
  validateNotEmpty,
} from '../utils/validations'

type Props = {
  id?: any,
  multiline?: boolean,
  onChangeText: (text: string, formInputId: any) => any,
  onValidate: (isValid: boolean, formInputId: any) => any,
  required?: boolean,
  validationType?:
    | typeof validationTypes.ACCESS_KEY
    | typeof validationTypes.APPLICATION_ID
    | typeof validationTypes.APPLICATION_DESCRIPTION
    | typeof validationTypes.DEVICE_ID
    | typeof validationTypes.EMAIL
    | typeof validationTypes.NONE
    | typeof validationTypes.USERNAME,
  value: ?string,
}

class FormInput extends Component {
  props: Props
  state = {
    isInvalid: false,
    validationMsg: '',
    hasEnteredText: false,
  }
  _onChangeText = text => {
    const { validationType } = this.props
    switch (validationType) {
      case validationTypes.ACCESS_KEY:
      case validationTypes.APPLICATION_ID:
      case validationTypes.DEVICE_ID:
        text = text.toLowerCase()
        break
      case validationTypes.NONE:
      default:
    }

    if (this.state.hasEnteredText) this._validateText(text)
    else this.setState({ hasEnteredText: true })

    this.props.onChangeText(text, this.props.id)
  }
  _validateText = (value: ?string) => {
    const { id, onValidate, required, validationType } = this.props
    let validation

    switch (validationType) {
      case validationTypes.ACCESS_KEY:
      case validationTypes.APPLICATION_ID:
      case validationTypes.DEVICE_ID:
        validation = validateDeviceId(value)
        break
      case validationTypes.APPLICATION_DESCRIPTION:
        validation = validateApplicationDescription(value)
        break
      case validationTypes.EMAIL:
        validation = validateEmailAddress(value)
        break
      default:
        validation = required ? validateNotEmpty(value) : getValidResponse()
    }
    const { isInvalid, validationMsg } = validation
    this.setState({ isInvalid, validationMsg })
    onValidate && onValidate(!isInvalid, id)
  }
  render() {
    const { multiline, value } = this.props
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.textInput,
            this.state.isInvalid && styles.invalidInput,
          ]}
          onChangeText={this._onChangeText}
          onBlur={() => this._validateText(value)}
          multiline={multiline}
          underlineColorAndroid={this.state.isInvalid ? RED : DARK_GREY}
          value={value}
        />
        {this.state.isInvalid
          ? <ErrorText>{this.state.validationMsg}</ErrorText>
          : <View style={{ height: 20 }} />}
      </View>
    )
  }
}

export default FormInput

const iosInputStyle = {
  borderRadius: 5,
  backgroundColor: LIGHT_GREY,
  borderColor: GREY,
  borderWidth: 1,
  height: 40,
  marginTop: 10,
  padding: 5,
}

const androidInputStyle = {
  height: 40,
  marginTop: 10,
  padding: 5,
}

const invalidInput = Platform.OS === 'ios'
  ? {
      borderColor: RED,
      backgroundColor: LIGHT_RED,
    }
  : {}

const styles = StyleSheet.create({
  invalidMsg: {
    color: RED,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  invalidInput,
  textInput: Platform.OS === 'ios' ? iosInputStyle : androidInputStyle,
})
