//@flow

import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BLUE, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import { LEAGUE_SPARTAN } from '../constants/fonts'
import {
  DEVICES,
  MESSAGES_DOWN_W,
  MESSAGES_UP_R,
  SETTINGS,
} from '../constants/application'

import CancelButton from '../components/CancelButton'
import CheckBox from '../components/CheckBox'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'

import Ionicons from 'react-native-vector-icons/Ionicons'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'
import type { TTNApplication } from '../scopes/content/applications/types'

const BUTTON_SIZE = 60

type Props = {
  application: TTNApplication,
  onCancel: () => void,
  onSubmit: () => void,
  createAccessKeyAsync: Function,
}

type State = {
  accessKeyName: string,
  accessKeyNameValid: boolean,
  inProgress: boolean,
  settingsSelected: boolean,
  messagesSelected: boolean,
  devicesSelected: boolean,
}

class AccessKeyGenerateForm extends Component {
  props: Props
  state: State = {
    accessKeyName: '',
    accessKeyNameValid: false,
    inProgress: false,
    settingsSelected: false,
    messagesSelected: false,
    devicesSelected: false,
  }
  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'accessKeyName':
        this.setState({ accessKeyName: text })
        break
    }
  }
  _onValidate = (isValid, formInputId) => {
    switch (formInputId) {
      case 'accessKeyName':
        this.setState({ accessKeyNameValid: isValid })
        break
    }
  }
  _onSubmit = async () => {
    const { application, createAccessKeyAsync, onSubmit } = this.props
    const {
      accessKeyName,
      devicesSelected,
      messagesSelected,
      settingsSelected,
    } = this.state

    let rights = []
    settingsSelected && rights.push(SETTINGS)
    devicesSelected && rights.push(DEVICES)
    messagesSelected && rights.push(MESSAGES_UP_R, MESSAGES_DOWN_W)

    this.setState({ inProgress: true })
    await createAccessKeyAsync(application, { name: accessKeyName, rights })
    this.setState({ inProgress: false })
    onSubmit && onSubmit()
  }
  _allInputsValid() {
    const {
      accessKeyNameValid,
      devicesSelected,
      messagesSelected,
      settingsSelected,
    } = this.state
    return (
      accessKeyNameValid &&
      (devicesSelected || messagesSelected || settingsSelected)
    )
  }

  render() {
    const { onCancel } = this.props
    const { settingsSelected, devicesSelected, messagesSelected } = this.state
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.xButton}>
            <Ionicons name={'ios-close-outline'} size={40} />
          </TouchableOpacity>
          <Text style={styles.formTitle}>GENERATE ACCESS KEY</Text>
        </View>
        <View style={styles.container}>

          <FormLabel primaryText="Name" secondaryText="What is this key for?" />
          <FormInput
            id="accessKeyName"
            validationType="accessKey"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.accessKeyName.toLowerCase()}
            required
          />

          <FormLabel primaryText="Rights" />
          <View style={styles.optionContainer}>
            <CheckBox
              primaryText="Settings"
              secondaryText="Edit the application settings"
              selected={settingsSelected}
              onPress={() =>
                this.setState({ settingsSelected: !settingsSelected })}
            />
            <CheckBox
              primaryText="Devices"
              secondaryText="View and edit devices of the application"
              selected={devicesSelected}
              onPress={() =>
                this.setState({ devicesSelected: !devicesSelected })}
            />
            <CheckBox
              primaryText="Messages"
              secondaryText="View and send messages from and to the application"
              selected={messagesSelected}
              onPress={() =>
                this.setState({ messagesSelected: !messagesSelected })}
            />
          </View>

          <View>
            <View style={styles.buttonRow}>
              <CancelButton onPress={onCancel} style={styles.cancelButton} />
              <SubmitButton
                active={this._allInputsValid()}
                inProgress={this.state.inProgress}
                onPress={this._onSubmit}
                style={styles.submitButton}
                title="Generate Access Key"
              />
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

export default connect(null, TTNApplicationActions)(AccessKeyGenerateForm)

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    marginRight: 20,
  },
  xButton: {
    marginLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  submitButton: {
    width: BUTTON_SIZE * 3.4,
    height: BUTTON_SIZE,
    marginBottom: 15,
  },
  container: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: WHITE,
  },
  formTitle: {
    color: BLUE,
    fontFamily: LEAGUE_SPARTAN,
    fontSize: 22,
  },
  header: {
    paddingTop: 20,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderBottomWidth: 2,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  option: {
    borderColor: BLUE,
    borderBottomWidth: 1,
  },
  optionContainer: {
    padding: 10,
  },
})
