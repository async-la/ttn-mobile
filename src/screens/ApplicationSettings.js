//@flow

import React, { Component } from 'react'
import {
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'

import { DARK_GREY } from '../constants/colors'

import ConfirmAlert from '../components/ConfirmAlert'
import ContentBlock from '../components/ContentBlock'
import DeleteButton from '../components/DeleteButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'

import type { TTNApplication } from '../scopes/content/applications/types'

import * as TTNApplicationActions from '../scopes/content/applications/actions'

import { connect } from 'react-redux'

type Props = {
  application: TTNApplication,
  deleteApplicationAsync: typeof TTNApplicationActions.deleteApplicationAsync,
  updateApplicationAsync: typeof TTNApplicationActions.updateApplicationAsync,
  navigation: Object,
};

const BUTTON_SIZE = 60

class ApplicationSettings extends Component {
  props: Props;
  state = {
    description: '',
    originalDescription: '',
    inProgressDelete: false,
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

  _confirmDelete = async () => {
    const { deleteApplicationAsync } = this.props
    this.setState({ inProgressDelete: true })
    await deleteApplicationAsync(this.props.application)
    this.setState({ inProgressDelete: false })
    this.props.navigation.goBack(null)
  };

  _cancelDelete = () => {
    if (Platform.OS === 'android')
      ToastAndroid.show('Application delete cancelled', ToastAndroid.SHORT)
  };

  render() {
    const { application } = this.props
    return (
      <View style={styles.container}>

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

          </ContentBlock>
          <View style={styles.buttonRow}>

            <DeleteButton
              confirm
              inProgress={this.state.inProgressDelete}
              itemToDeleteTitle={application.id}
              onConfirm={this._confirmDelete}
              onDeny={this._cancelDelete}
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
        </ScrollView>
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  submitButton: {
    width: BUTTON_SIZE * 2,
    height: BUTTON_SIZE,
  },
  deleteButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    color: DARK_GREY,
  },
})
