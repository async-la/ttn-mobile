//@flow

import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { BLUE, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import { LEAGUE_SPARTAN } from '../constants/fonts'
import {
  COLLABORATORS,
  DELETE,
  DEVICES,
  SETTINGS,
} from '../constants/application'

import CancelButton from '../components/CancelButton'
import CheckBox from '../components/CheckBox'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'
import type { TTNApplication } from '../scopes/content/applications/types'

const BUTTON_SIZE = 60

type Props = {
  application: TTNApplication,
  onCancel: () => void,
  onSubmit: () => void,
  //createCollaboratorAsync:  typeof TTNApplicationActions.createCollaboratorAsync,
};

type State = {
  username: string,
  usernameValid: boolean,
  inProgress: boolean,
  deleteSelected: boolean,
  settingsSelected: boolean,
  devicesSelected: boolean,
  collaboratorsSelected: boolean,
};

class CollaboratorForm extends Component {
  props: Props;
  state: State = {
    username: '',
    usernameValid: false,
    inProgress: false,
    deleteSelected: false,
    settingsSelected: true,
    devicesSelected: false,
    collaboratorsSelected: false,
  };
  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'username':
        this.setState({ username: text })
        break
    }
  };
  _onValidate = (isValid, formInputId) => {
    switch (formInputId) {
      case 'username':
        this.setState({ usernameValid: isValid })
        break
    }
  };
  _onSubmit = async () => {
    const { application, createCollaboratorAsync, onSubmit } = this.props
    const {
      username,
      collaboratorsSelected,
      devicesSelected,
      deleteSelected,
      settingsSelected,
    } = this.state

    let rights = []
    settingsSelected && rights.push(SETTINGS)
    collaboratorsSelected && rights.push(COLLABORATORS)
    deleteSelected && rights.push(DELETE)
    devicesSelected && rights.push(DEVICES)

    this.setState({ inProgress: true })
    await createCollaboratorAsync(application, { username, rights })
    this.setState({ inProgress: false })
    onSubmit && onSubmit()
  };
  _allInputsValid() {
    return this.state.usernameValid
  }

  render() {
    const { onCancel } = this.props
    const {
      settingsSelected,
      collaboratorsSelected,
      deleteSelected,
      devicesSelected,
    } = this.state
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.formTitle}>ADD COLLABORATOR</Text>
        </View>
        <View style={styles.container}>

          <FormLabel primaryText="Username" />
          <FormInput
            id="username"
            validationType="username"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.username}
            required
          />

          <FormLabel primaryText="Rights" />
          <View style={styles.optionContainer}>
            <CheckBox
              primaryText="Settings"
              secondaryText="Manage the application settings &amp; access keys"
              selected={settingsSelected}
              onPress={() => {}}
            />
            <CheckBox
              primaryText="Collaborators"
              secondaryText="Edit the application collaborators"
              selected={collaboratorsSelected}
              onPress={() =>
                this.setState({
                  collaboratorsSelected: !collaboratorsSelected,
                })}
            />
            <CheckBox
              primaryText="Delete"
              secondaryText="Delete the application"
              selected={deleteSelected}
              onPress={() => this.setState({ deleteSelected: !deleteSelected })}
            />
            <CheckBox
              primaryText="Devices"
              secondaryText="View and edit devices of the application"
              selected={devicesSelected}
              onPress={() =>
                this.setState({ devicesSelected: !devicesSelected })}
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
                title="Add Collaborator"
              />
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

export default connect(null, TTNApplicationActions)(CollaboratorForm)

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
  submitButton: {
    width: BUTTON_SIZE * 3.75,
    height: BUTTON_SIZE,
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
    marginLeft: 20,
    marginBottom: 15,
  },
  header: {
    paddingTop: 40,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderBottomWidth: 2,
  },
  option: {
    borderColor: BLUE,
    borderBottomWidth: 1,
  },
  optionContainer: {
    padding: 10,
  },
})
