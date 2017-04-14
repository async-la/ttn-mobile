//@flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Modal,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native'

import { BLUE, DARK_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import Ionicons from 'react-native-vector-icons/Ionicons'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import AccessKeyGenerateForm from '../components/AccessKeyGenerateForm'
import AddButton from '../components/AddButton'
import ClipboardToggle from '../components/ClipboardToggle'
import CollaboratorForm from '../components/CollaboratorForm'
import ConfirmAlert from '../components/ConfirmAlert'
import ContentBlock from '../components/ContentBlock'
import DeleteButton from '../components/DeleteButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'
import TagLabel from '../components/TagLabel'

import type { TTNApplication } from '../scopes/content/applications/types'
import { connect } from 'react-redux'

type Props = {
  application: TTNApplication,
  createEUIAsync: typeof TTNApplicationActions.createEUIAsync,
  deleteAccessKeyAsync: typeof TTNApplicationActions.deleteAccessKeyAsync,
  deleteApplicationAsync: typeof TTNApplicationActions.deleteApplicationAsync,
  deleteCollaboratorAsync: typeof TTNApplicationActions.deleteCollaboratorAsync,
  deleteEUIAsync: typeof TTNApplicationActions.deleteEUIAsync,
  updateApplicationAsync: typeof TTNApplicationActions.updateApplicationAsync,
  navigation: Object,
};

const BUTTON_SIZE = 60

class ApplicationSettings extends Component {
  props: Props;
  state = {
    accessKeyGenerateFormVisible: false,
    collaboratorFormVisible: false,
    description: '',
    originalDescription: '',
    inProgressDelete: false,
    inProgressEUI: false,
    inProgressGeneral: false,
    inProgressSubmit: false,
    isValid: true,
    originalHandler: '',
    handler: '',
    showDeleteConfirmation: false,
  };
  componentDidMount() {
    const { application } = this.props
    this.setState({
      originalDescription: application.name,
      description: application.name,
      handler: application.handler || '',
      originalHandler: application.handler || '',
    })
  }

  shouldComponentUpdate(nextProps) {
    // Prevent updating if application has been deleted by user
    if (!nextProps.application) return false
    return true
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.application &&
      this.props.application.name !== nextProps.application.name
    )
      this.setState({ originalDescription: nextProps.application.name })
    if (
      nextProps.application &&
      this.props.application.handler !== nextProps.application.handler
    )
      this.setState({ originalHandler: nextProps.application.handler || '' })
  }

  _allInputsValid() {
    const descriptionHasChanged = this.state.description !==
      this.state.originalDescription
    const handlerHasChanged = this.state.handler !== this.state.originalHandler
    return this.state.isValid && (handlerHasChanged || descriptionHasChanged)
  }

  _onChangeText = text => {
    this.setState({ description: text })
  };
  _onValidate = isValid => {
    this.setState({ isValid })
  };
  _onSubmit = async () => {
    const { application } = this.props
    const { description, handler } = this.state
    const handlerHasChanged = this.state.handler !== this.state.originalHandler

    let body = {
      id: application.id,
      name: description,
    }

    if (handlerHasChanged) {
      body = {
        ...body,
        handler: handler || 'none',
      }

      ConfirmAlert({
        title: 'Caution',
        message: `Are you sure you want to change the handler for application ${application.id}? This will remove all your devices.`,
        confirmButtonTitle: 'OK',
        denyButtonTitle: 'Cancel',
        onConfirm: () => this._updateApplication(body),
        onDeny: () => {
          this.setState({ handler: this.state.originalHandler })
          if (Platform.OS === 'android')
            ToastAndroid.show(
              'Application update cancelled',
              ToastAndroid.SHORT
            )
        },
      })
    } else {
      this._updateApplication(body)
    }
  };
  _updateApplication = async body => {
    const { updateApplicationAsync } = this.props
    this.setState({ inProgressSubmit: true })
    await updateApplicationAsync(body)
    this.setState({ inProgressSubmit: false })
  };

  _confirmDeleteApplication = async () => {
    const { deleteApplicationAsync } = this.props
    this.setState({ inProgressDelete: true })
    await deleteApplicationAsync(this.props.application)
    this.setState({ inProgressDelete: false })
    this.props.navigation.goBack(null)
  };

  _cancelDeleteApplication = () => {
    if (Platform.OS === 'android')
      ToastAndroid.show('Application delete cancelled', ToastAndroid.SHORT)
  };

  _addEUI = async () => {
    console.log('ADDING EUI!!')
    const { application, createEUIAsync } = this.props
    this.setState({ inProgressEUI: true })
    await createEUIAsync(application)
    this.setState({ inProgressEUI: false })
  };
  _deleteEui = async eui => {
    const { application, deleteEUIAsync } = this.props
    this.setState({ inProgressGeneral: true })
    await deleteEUIAsync(application, eui)
    this.setState({ inProgressGeneral: false })
  };
  _renderAccessKeyGenerateForm = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.accessKeyGenerateFormVisible}
        onRequestClose={() => {}}
      >
        <AccessKeyGenerateForm
          application={this.props.application}
          onCancel={this._dismissAccessKeyForm}
          onSubmit={this._dismissAccessKeyForm}
        />
      </Modal>
    )
  };
  _renderCollaboratorForm = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.collaboratorFormVisible}
        onRequestClose={this._noop}
      >
        <CollaboratorForm
          application={this.props.application}
          onCancel={this._dismissCollaboratorForm}
          onSubmit={this._dismissCollaboratorForm}
        />
      </Modal>
    )
  };
  _showAccessKeyForm = () => {
    this.setState({ accessKeyGenerateFormVisible: true })
  };
  _dismissAccessKeyForm = () => {
    this.setState({ accessKeyGenerateFormVisible: false })
  };
  _showCollaboratorForm = () => {
    this.setState({ collaboratorFormVisible: true })
  };
  _dismissCollaboratorForm = () => {
    this.setState({ collaboratorFormVisible: false })
  };
  _deleteAccessKey = async accessKey => {
    const { application, deleteAccessKeyAsync } = this.props
    this.setState({ inProgressGeneral: true })
    await deleteAccessKeyAsync(application, accessKey)
    this.setState({ inProgressGeneral: false })
  };
  _deleteCollaborator = async collaborator => {
    const { application, deleteCollaboratorAsync } = this.props
    this.setState({ inProgressGeneral: true })
    await deleteCollaboratorAsync(application, collaborator)
    this.setState({ inProgressGeneral: false })
  };
  _noop() {
    return null
  }

  render() {
    const { application } = this.props
    return (
      <View style={styles.container}>
        {this._renderAccessKeyGenerateForm()}
        {this._renderCollaboratorForm()}
        <ScrollView>
          <ContentBlock heading={application.id.toUpperCase()}>

            <FormLabel primaryText="Description" />
            <FormInput
              id="applicationDescription"
              validationType="applicationDescription"
              onChangeText={this._onChangeText}
              onValidate={this._onValidate}
              value={this.state.description}
            />

            <FormLabel primaryText="Handler" />
            <Picker
              selectedValue={this.state.handler}
              onValueChange={handler => this.setState({ handler })}
            >
              <Picker.Item
                label="ttn-handler-asia-se"
                value="ttn-handler-asia-se"
              />
              <Picker.Item
                label="ttn-handler-brazil"
                value="ttn-handler-brazil"
              />
              <Picker.Item
                label="ttn-handler-us-west"
                value="ttn-handler-us-west"
              />
              <Picker.Item label="ttn-handler-eu" value="ttn-handler-eu" />
              <Picker.Item label="Do not register to a handler" value="" />
            </Picker>
            <View style={styles.buttonRow}>
              <DeleteButton
                confirm
                inProgress={this.state.inProgressDelete}
                itemToDeleteTitle={`application ${application.id}`}
                onConfirm={this._confirmDeleteApplication}
                onDeny={this._cancelDeleteApplication}
                style={styles.deleteButton}
              />
              <SubmitButton
                active={this._allInputsValid()}
                inProgress={this.state.inProgressSubmit}
                onPress={this._onSubmit}
                style={styles.submitButton}
                title="Save"
              />
            </View>
          </ContentBlock>

          <ContentBlock
            heading="EUIS"
            headingRight={
              <AddButton
                header
                inProgress={this.state.inProgressEUI}
                disabled={!application.handler}
                onPress={application.handler ? this._addEUI : this._noop}
              />
            }
          >
            {application.euis &&
              application.euis.map((eui, i) => {
                return (
                  <View style={styles.euiRow} key={i}>
                    <ClipboardToggle
                      value={eui}
                      style={{ flex: 1, marginRight: 20 }}
                    />
                    <DeleteButton
                      itemToDeleteTitle={`EUI ${eui}`}
                      small
                      onConfirm={() => this._deleteEui(eui)}
                    />
                  </View>
                )
              })}
          </ContentBlock>

          <ContentBlock
            heading="ACCESS KEYS"
            headingRight={
              <AddButton
                header
                disabled={!application.handler}
                onPress={
                  application.handler ? this._showAccessKeyForm : this._noop
                }
              />
            }
          >
            {application.access_keys &&
              application.access_keys.map((accessKey, i) => {
                return (
                  <View key={i}>
                    <View style={styles.titleRow}>
                      <Text style={styles.accessKeyTitle}>
                        {accessKey.name}
                      </Text>
                      <DeleteButton
                        small
                        itemToDeleteTitle={`Access Key ${accessKey.name}`}
                        onConfirm={() => this._deleteAccessKey(accessKey)}
                      />
                    </View>
                    <ClipboardToggle password value={accessKey.key} />
                    <View style={styles.rightsRow}>
                      {accessKey.rights &&
                        accessKey.rights.map((accessKeyRight, j) => {
                          return (
                            <View style={styles.tagLabel} key={j}>
                              <TagLabel key={j}>{accessKeyRight}</TagLabel>
                            </View>
                          )
                        })}
                    </View>
                  </View>
                )
              })}
          </ContentBlock>

          <ContentBlock
            heading="COLLABORATORS"
            headingRight={
              <AddButton
                header
                disabled={!application.handler}
                onPress={
                  application.handler ? this._showCollaboratorForm : this._noop
                }
              />
            }
          >
            {application.collaborators &&
              application.collaborators.map((collaborator, i) => {
                return (
                  <View key={i}>
                    <View style={styles.titleRow}>
                      <View style={styles.collaboratorName}>
                        <Ionicons
                          name={'md-contact'}
                          size={20}
                          style={{ marginRight: 20 }}
                        />
                        <Text style={styles.collaboratorTitle}>
                          {collaborator.username}
                        </Text>
                      </View>
                      <DeleteButton
                        small
                        itemToDeleteTitle={
                          `collaborator ${collaborator.username}`
                        }
                        onConfirm={() => this._deleteCollaborator(collaborator)}
                      />
                    </View>
                    <View style={styles.rightsRow}>
                      {collaborator.rights &&
                        collaborator.rights.map((collaboratorRight, j) => {
                          return (
                            <View style={styles.tagLabel} key={j}>
                              <TagLabel>{collaboratorRight}</TagLabel>
                            </View>
                          )
                        })}
                    </View>
                  </View>
                )
              })}
          </ContentBlock>

        </ScrollView>
        {this.state.inProgressGeneral &&
          <ActivityIndicator
            size="large"
            style={styles.activityIndicator}
            color={BLUE}
          />}
      </View>
    )
  }
}

export default connect(
  (state, props) => ({
    application: state.content.applications.dictionary[
      props.navigation.state.params.appId
    ],
  }),
  TTNApplicationActions
)(ApplicationSettings)

const styles = StyleSheet.create({
  rightsRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  accessKeyTitle: {
    color: DARK_GREY,
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
  },
  collaboratorTitle: {
    color: DARK_GREY,
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  activityIndicator: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  collaboratorName: {
    flexDirection: 'row',
  },
  submitButton: {
    width: BUTTON_SIZE * 2,
    height: BUTTON_SIZE,
  },
  deleteButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  euiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    color: DARK_GREY,
  },
  tagLabel: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginRight: 10,
    marginBottom: 10,
  },
})
