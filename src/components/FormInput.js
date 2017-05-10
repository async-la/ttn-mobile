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
import { validationTypes } from '../constants/validation'

import ErrorText from './ErrorText'

import {
  getValidResponse,
  validateApplicationDescription,
  validateDeviceId,
  validateEmailAddress,
  validateNumber,
  validateNotEmpty,
} from '../utils/validations'

type Props = {
  id?: any,
  defaultValue?: string,
  editable?: boolean,
  keyboardType?: string,
  multiline?: boolean,
  onChangeText?: (text: string, formInputId: any) => any,
  onSubmitEditing?: Function,
  onValidate?: (isValid: boolean, formInputId: any) => any,
  required?: boolean,
  returnKeyType?: string,
  validationType?:
    | typeof validationTypes.ACCESS_KEY
    | typeof validationTypes.APPLICATION_ID
    | typeof validationTypes.APPLICATION_DESCRIPTION
    | typeof validationTypes.DEVICE_ID
    | typeof validationTypes.EMAIL
    | typeof validationTypes.NONE
    | typeof validationTypes.USERNAME,
  value: ?string | ?number,
}

class FormInput extends Component {
  _textInput: TextInput
  props: Props
  state = {
    isInvalid: false,
    validationMsg: '',
    hasEnteredText: false,
  }
  _onChangeText = (text: string) => {
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

    this.props.onChangeText && this.props.onChangeText(text, this.props.id)
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
      case validationTypes.NUMBER:
        validation = validateNumber(value)
        break
      case validationTypes.GATEWAY_DESCRIPTION:
      default:
        validation = required ? validateNotEmpty(value) : getValidResponse()
    }
    const { isInvalid, validationMsg } = validation
    this.setState({ isInvalid, validationMsg })
    onValidate && onValidate(!isInvalid, id)
  }
  isFocused = () => {
    return this._textInput && this._textInput.isFocused()
  }
  focus = () => {
    return this._textInput && this._textInput.focus()
  }
  render() {
    const {
      defaultValue,
      editable,
      keyboardType = 'default',
      multiline,
      onSubmitEditing,
      returnKeyType,
      value = '',
    } = this.props
    const stringifiedVal = String(value)
    return (
      <View>
        <TextInput
          ref={ref => (this._textInput = ref)}
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={defaultValue}
          editable={editable}
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={this._onChangeText}
          onBlur={() => this._validateText(stringifiedVal)}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          underlineColorAndroid={this.state.isInvalid ? RED : DARK_GREY}
          value={stringifiedVal}
          style={[
            styles.textInput,
            this.state.isInvalid && styles.invalidInput,
          ]}
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
