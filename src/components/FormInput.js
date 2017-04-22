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

import ErrorText from './ErrorText'

type Props = {
  id?: any,
  multiline?: boolean,
  onChangeText: (text: string, formInputId: any) => any,
  onValidate: (isValid: boolean, formInputId: any) => any,
  required?: boolean,
  validationType?:
    | 'accessKey'
    | 'applicationId'
    | 'applicationDescription'
    | 'deviceId'
    | 'email'
    | 'none'
    | 'username',
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
      case 'accessKey':
      case 'applicationId':
      case 'deviceId':
        text = text.toLowerCase()
        break
      case 'none':
      default:
    }

    if (this.state.hasEnteredText) this._validateText(text)
    else this.setState({ hasEnteredText: true })

    this.props.onChangeText(text, this.props.id)
  }
  _validateText = value => {
    const { id, onValidate, required, validationType } = this.props
    let isInvalid
    let validationMsg

    switch (validationType) {
      case 'accessKey':
      case 'applicationId':
      case 'deviceId':
        const regexp = /^[a-z0-9]+([-_][a-z0-9]+)*$/
        isInvalid = !value || value.length < 2 || !regexp.test(value)
        validationMsg =
          'Name must consist of lowercase alphanumeric characters, nonconsecutive - and _ and cannot start or end with - or _'
        break
      case 'applicationDescription':
        isInvalid = !value || value.length < 1
        validationMsg = 'Description cannot be empty'
        break
      case 'email':
      default:
        isInvalid = required ? !value || !value.length : false
        validationMsg = 'Field cannot be blank'
    }

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
