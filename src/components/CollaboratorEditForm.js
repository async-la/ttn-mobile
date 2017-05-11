//@flow

import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BLUE, GREY, LIGHT_GREY, MID_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR, LEAGUE_SPARTAN } from '../constants/fonts'
import {
  COLLABORATORS,
  DELETE,
  DEVICES,
  SETTINGS,
} from '../constants/application'

import Ionicons from 'react-native-vector-icons/Ionicons'

import CancelButton from '../components/CancelButton'
import CheckBox from '../components/CheckBox'
import DeleteButton from '../components/DeleteButton'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'

import copy from '../constants/copy'

import _ from 'lodash'
import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'
import type { TTNApplication } from '../scopes/content/applications/types'
import { applicationHasCollaboratorRights } from '../utils/permissionCheck'

const BUTTON_SIZE = 60

type Props = {
  application: TTNApplication,
  collaborator: Object,
  onCancel: Function,
  onDelete: Function,
  onSubmit: Function,
  createCollaboratorAsync: typeof TTNApplicationActions.deleteCollaboratorAsync,
  deleteCollaboratorAsync: typeof TTNApplicationActions.deleteCollaboratorAsync,
}

type State = {
  collaboratorsSelected: boolean,
  deleteSelected: boolean,
  devicesSelected: boolean,
  inProgress: boolean,
  inProgressDelete: boolean,
  settingsSelected: boolean,
  username: string,
  usernameValid: boolean,
}

class CollaboratorForm extends Component {
  props: Props
  state: State = {
    collaboratorsSelected: false,
    deleteSelected: false,
    devicesSelected: false,
    inProgress: false,
    inProgressDelete: false,
    settingsSelected: true,
    username: '',
    usernameValid: false,
  }
  componentDidMount() {
    const { username, rights } = this.props.collaborator
    this.setState({
      username,
      settingsSelected: rights.indexOf(SETTINGS) >= 0,
      devicesSelected: rights.indexOf(DEVICES) >= 0,
      deleteSelected: rights.indexOf(DELETE) >= 0,
      collaboratorsSelected: rights.indexOf(COLLABORATORS) >= 0,
    })
  }

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

    try {
      this.setState({ inProgress: true })
      await createCollaboratorAsync(application, { username, rights })
      this.setState({ inProgress: false })
      onSubmit && onSubmit()
    } catch (err) {
      this.setState({ inProgress: false })
      switch (err.status) {
        case 403:
          alert(copy.UNAUTHORIZED)
          return
        case 404:
          alert(copy.USERNAME_NOT_FOUND)
          return
        default:
          alert(copy.UNKNOWN_ERROR)
          return
      }
    }
  }
  _deleteCollaborator = async () => {
    const { application, collaborator, deleteCollaboratorAsync } = this.props
    this.setState({ inProgressDelete: true })
    await deleteCollaboratorAsync(application, collaborator)
    this.setState({ inProgressDelete: false })
    return this.props.onDelete && this.props.onDelete()
  }
  _rightsHaveChanged() {
    const {
      collaboratorsSelected,
      deleteSelected,
      devicesSelected,
      settingsSelected,
    } = this.state

    let selectedRights = []
    settingsSelected && selectedRights.push(SETTINGS)
    collaboratorsSelected && selectedRights.push(COLLABORATORS)
    deleteSelected && selectedRights.push(DELETE)
    devicesSelected && selectedRights.push(DEVICES)

    return !_.isEqual(
      selectedRights.sort(),
      this.props.collaborator.rights.sort()
    )
  }

  render() {
    const { application, collaborator, onCancel } = this.props
    const {
      settingsSelected,
      collaboratorsSelected,
      deleteSelected,
      devicesSelected,
    } = this.state

    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.xButton}>
            <Ionicons name={'ios-close-outline'} size={40} />
          </TouchableOpacity>
          <Text style={styles.formTitle}>
            {copy.EDIT_COLLABORATOR.toUpperCase()}
          </Text>
        </View>
        <View style={styles.container}>

          <FormLabel primaryText={copy.COLLABORATOR} />
          <Text style={styles.uneditableText}>{collaborator.username}</Text>

          <FormLabel primaryText={copy.APPLICATION} />
          <Text style={styles.uneditableText}>{application.id}</Text>

          <FormLabel primaryText={copy.RIGHTS} />
          <View style={styles.optionContainer}>
            <CheckBox
              primaryText={copy.SETTINGS}
              secondaryText={copy.RIGHT_DESCRIPTION_SETTINGS}
              selected={settingsSelected}
              onPress={() => {}}
            />
            <CheckBox
              primaryText={copy.COLLABORATORS}
              secondaryText={copy.RIGHT_DESCRIPTION_COLLABORATORS}
              selected={collaboratorsSelected}
              onPress={() =>
                this.setState({
                  collaboratorsSelected: !collaboratorsSelected,
                })}
            />
            <CheckBox
              primaryText={copy.DELETE}
              secondaryText={copy.RIGHT_DESCRIPTION_DELETE}
              selected={deleteSelected}
              onPress={() => this.setState({ deleteSelected: !deleteSelected })}
            />
            <CheckBox
              primaryText={copy.DEVICES}
              secondaryText={copy.RIGHT_DESCRIPTION_DEVICES}
              selected={devicesSelected}
              onPress={() =>
                this.setState({ devicesSelected: !devicesSelected })}
            />
          </View>

          <View>
            {applicationHasCollaboratorRights(application) &&
              <DeleteButton
                title={copy.REMOVE_COLLABORATOR.toUpperCase()}
                small
                confirm
                confirmButtonTitle={copy.REMOVE}
                confirmMessage={`${copy.CONFIRM_REMOVE} ${collaborator.username} ${copy.FROM} ${copy.APPLICATION.toLowerCase()} ${application.id}`}
                inProgress={this.state.inProgressDelete}
                itemToDeleteTitle={`${copy.COLLABORATOR.toLowerCase()} ${collaborator.username}`}
                onConfirm={this._deleteCollaborator}
                onDeny={() => {}}
                style={styles.deleteButton}
              />}
            <View style={styles.buttonRow}>
              <CancelButton onPress={onCancel} style={styles.cancelButton} />
              <SubmitButton
                active={this._rightsHaveChanged()}
                inProgress={this.state.inProgress}
                onPress={this._onSubmit}
                style={styles.submitButton}
                title="Save"
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
  xButton: {
    marginLeft: 20,
  },
  deleteButton: {
    marginVertical: 20,
  },
  submitButton: {
    width: BUTTON_SIZE * 3.25,
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
    paddingTop: 20,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  uneditableText: {
    color: MID_GREY,
    fontFamily: LATO_REGULAR,
  },
  option: {
    borderColor: BLUE,
    borderBottomWidth: 1,
  },
  optionContainer: {
    padding: 10,
  },
})
