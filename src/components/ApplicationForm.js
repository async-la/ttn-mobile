//@flow

import React, { Component } from 'react'
import { Picker, ScrollView, StyleSheet, Text, View } from 'react-native'

import { BLUE, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import { LEAGUE_SPARTAN } from '../constants/fonts'

import CancelButton from '../components/CancelButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'

const BUTTON_SIZE = 60

type Props = {
  onCancel: () => void,
  onSubmit: () => void,
  //addApplicationAsync:  typeof TTNApplicationActions.addApplicationAsync,
};

class ApplicationForm extends Component {
  props: Props;
  state = {
    description: '',
    descriptionValid: false,
    id: '',
    idValid: false,
    inProgress: false,
    handler: 'ttn-handler-us-west',
  };
  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'applicationId':
        this.setState({ id: text })
        break
      case 'applicationDescription':
        this.setState({ description: text })
        break
    }
  };
  _onValidate = (isValid, formInputId) => {
    switch (formInputId) {
      case 'applicationId':
        this.setState({ idValid: isValid })
        break
      case 'applicationDescription':
        this.setState({ descriptionValid: isValid })
        break
    }
  };
  _onSubmit = async () => {
    const { addApplicationAsync } = this.props

    const body = {
      id: this.state.id,
      name: this.state.description,
      handler: this.state.handler,
    }

    this.setState({ inProgress: true })
    await addApplicationAsync(body)
    this.setState({ inProgress: false })
    this.props.onSubmit()
  };
  _allInputsValid() {
    return this.state.idValid && this.state.descriptionValid
  }

  render() {
    const { onCancel } = this.props
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.formTitle}>ADD APPLICATION</Text>
        </View>
        <View style={styles.container}>

          <FormLabel
            primaryText="Application ID"
            secondaryText="The unique identifier of your application on the network"
          />
          <FormInput
            id="applicationId"
            validationType="applicationId"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.id.toLowerCase()}
            required
          />

          <FormLabel
            primaryText="Description"
            secondaryText="A human readable description of your new app"
          />
          <FormInput
            id="applicationDescription"
            validationType="applicationDescription"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.description}
          />

          <FormLabel
            primaryText="Handler registration"
            secondaryText="Select the handler you want to register this application to"
          />
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

          <View>
            <View style={styles.buttonRow}>
              <CancelButton onPress={onCancel} style={styles.cancelButton} />
              <SubmitButton
                active={this._allInputsValid()}
                inProgress={this.state.inProgress}
                onPress={this._onSubmit}
                style={styles.submitButton}
                title="Add application"
              />
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

export default connect(null, TTNApplicationActions)(ApplicationForm)

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 20,
  },
  submitButton: {
    width: BUTTON_SIZE * 3.5,
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
})
