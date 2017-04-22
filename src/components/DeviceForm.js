//@flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BLUE, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import { LEAGUE_SPARTAN } from '../constants/fonts'

import CancelButton from '../components/CancelButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import RadioButtonPanel from '../components/RadioButtonPanel'
import SubmitButton from '../components/SubmitButton'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import type { TTNApplication } from '../scopes/content/applications/types'
import { connect } from 'react-redux'
import { splitHex } from '../utils/payloadConversion'

const BUTTON_SIZE = 60

type Props = {
  application: TTNApplication,
  onCancel: () => void,
  onSubmit: () => void,
  //addDeviceAsync:  typeof TTNApplicationActions.addDeviceAsync,
  //createEUIAsync:  typeof TTNApplicationActions.createEUIAsync,
}

type State = {
  eui: string,
  id: string,
  idValid: boolean,
  inProgress: boolean,
  inProgressEUI: boolean,
}

class ApplicationForm extends Component {
  props: Props
  state: State = {
    eui: '',
    id: '',
    idValid: false,
    inProgress: false,
    inProgressEUI: false,
  }

  componentDidMount() {
    const { application } = this.props
    if (application.euis && application.euis.length)
      this.setState({ eui: application.euis[0] })
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.eui &&
      nextProps.application.euis &&
      nextProps.application.euis.length
    ) {
      this.setState({ eui: nextProps.application.euis[0] })
    }
  }

  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'deviceId':
        this.setState({ id: text })
        break
    }
  }
  _onValidate = (isValid, formInputId) => {
    switch (formInputId) {
      case 'deviceId':
        this.setState({ idValid: isValid })
        break
    }
  }
  _onSubmit = async () => {
    const { application, addDeviceAsync } = this.props
    const { eui, id } = this.state

    const device = {
      app_eui: eui,
      dev_id: id,
    }

    this.setState({ inProgress: true })
    await addDeviceAsync(application, device)
    this.setState({ inProgress: false })
    this.props.onSubmit()
  }
  _allInputsValid() {
    return this.state.idValid && this.state.eui
  }

  _addEUI = async () => {
    const { application, createEUIAsync } = this.props
    this.setState({ inProgressEUI: true })
    await createEUIAsync(application)
    this.setState({ inProgressEUI: false })
  }

  render() {
    const { application, onCancel } = this.props
    const appHasEUI = !!(application.euis && application.euis.length)
    console.log('has EUI', appHasEUI)
    const euis = appHasEUI
      ? application.euis.map(eui => ({
          label: splitHex(eui),
          value: eui,
        }))
      : []

    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.formTitle}>REGISTER DEVICE</Text>
        </View>
        <View style={styles.container}>

          <FormLabel
            primaryText="Device ID"
            secondaryText="This is the unique identifier for the device in this app. The device ID will be immutable."
          />
          <FormInput
            id="deviceId"
            validationType="deviceId"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.id.toLowerCase()}
            required
          />

          <FormLabel primaryText="App EUI" />
          {appHasEUI
            ? <RadioButtonPanel
                buttons={euis}
                selected={this.state.eui}
                onSelect={eui => this.setState({ eui })}
              />
            : <TouchableOpacity
                style={styles.noEUIButton}
                onPress={this._addEUI}
              >
                {!this.state.inProgressEUI
                  ? <Text style={styles.noEUIText}>Generate App EUI</Text>
                  : <ActivityIndicator size="small" color={BLUE} />}
              </TouchableOpacity>}

          <View>
            <View style={styles.buttonRow}>
              <CancelButton onPress={onCancel} style={styles.cancelButton} />
              <SubmitButton
                active={this._allInputsValid()}
                inProgress={this.state.inProgress}
                onPress={this._onSubmit}
                style={styles.submitButton}
                title="Register"
              />
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

export default connect(
  (state, props) => ({
    application: state.content.applications.dictionary[props.application.id],
  }),
  TTNApplicationActions
)(ApplicationForm)

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
    marginLeft: 20,
    marginBottom: 15,
  },
  header: {
    paddingTop: 40,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderBottomWidth: 2,
  },
  noEUIButton: {
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEUIText: {
    color: BLUE,
  },
})