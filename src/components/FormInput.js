//@flow

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'

import {
  LIGHT_RED,
  RED,
  DARK_GREY,
  LIGHT_GREY,
  GREY,
} from '../constants/colors'

type Props = {
  id: any,
  multiline?: boolean,
  onChangeText: (text: string, formInputId: any) => void,
  onValidate: (isValid: boolean, formInputId: any) => void,
  required?: boolean,
  validationType: 'email' | 'applicationId' | 'applicationDescription',
  value: string,
};

class FormInput extends Component {
  props: Props;
  state = {
    isInvalid: false,
    validationMsg: '',
    hasEnteredText: false,
  };
  _onChangeText = text => {
    if (this.state.hasEnteredText) this._validateText(text)
    else this.setState({ hasEnteredText: true })
    this.props.onChangeText(text, this.props.id)
  };
  _validateText = value => {
    const { id, onValidate, required, validationType } = this.props
    let isInvalid
    let validationMsg

    switch (validationType) {
      case 'email':
      case 'applicationId':
        isInvalid = !value || value.length < 2
        validationMsg = 'Application ID must contain at least 2 characters'
        break
      case 'applicationDescription':
        isInvalid = !value || value.length < 1
        validationMsg = 'Description cannot be empty'
        break
      default:
        isInvalid = required ? !value.length : false
        validationMsg = 'Field cannot be blank'
    }

    this.setState({ isInvalid, validationMsg })
    onValidate && onValidate(!isInvalid, id)
  };
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
          ? <Text style={styles.invalidMsg}>{this.state.validationMsg}</Text>
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
    height: 20,
  },
  invalidInput,
  textInput: Platform.OS === 'ios' ? iosInputStyle : androidInputStyle,
})
