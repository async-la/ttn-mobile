//@flow

import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'

import { BLUE, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import { LEAGUE_SPARTAN } from '../constants/fonts'
import copy from '../constants/copy'

import Ionicons from 'react-native-vector-icons/Ionicons'

import CancelButton from '../components/CancelButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import RadioButtonPanel from '../components/RadioButtonPanel'
import SubmitButton from '../components/SubmitButton'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { handlers } from '../constants/application'
import { connect } from 'react-redux'
import { getClosestOption } from '../utils/locationUtils'

const BUTTON_SIZE = 60

type Props = {
  onCancel: () => void,
  onSubmit: () => void,
  addApplicationAsync: Function,
}

type State = {
  description: string,
  descriptionValid: boolean,
  id: string,
  idValid: boolean,
  inProgress: boolean,
  handler: string,
}

class ApplicationForm extends Component {
  props: Props
  state: State = {
    description: '',
    descriptionValid: false,
    id: '',
    idValid: false,
    inProgress: false,
    handler: handlers[0].value,
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        handler: getClosestOption(position.coords, handlers).value,
      })
    })
  }

  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'applicationId':
        this.setState({ id: text })
        break
      case 'applicationDescription':
        this.setState({ description: text })
        break
    }
  }
  _onValidate = (isValid, formInputId) => {
    switch (formInputId) {
      case 'applicationId':
        this.setState({ idValid: isValid })
        break
      case 'applicationDescription':
        this.setState({ descriptionValid: isValid })
        break
    }
  }
  _onSubmit = async () => {
    const { addApplicationAsync } = this.props

    const body = {
      id: this.state.id,
      name: this.state.description,
      handler: this.state.handler,
    }

    try {
      this.setState({ inProgress: true })
      await addApplicationAsync(body)
      this.props.onSubmit && this.props.onSubmit()
    } catch (err) {
      console.log('## ApplicationForm _onSubmit error ', err)
      if (err.status === 409) {
        switch (Platform.OS) {
          case 'ios':
            alert(copy.APP_ID_ALREADY_REGISTERED)
            break
          case 'android':
            ToastAndroid.show(
              copy.APP_ID_ALREADY_REGISTERED,
              ToastAndroid.SHORT
            )
            break
        }
      }
    } finally {
      this.setState({ inProgress: false })
    }
  }
  _allInputsValid() {
    return this.state.idValid && this.state.descriptionValid
  }

  render() {
    const { onCancel } = this.props
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.xButton}>
            <Ionicons name={'ios-close-outline'} size={40} />
          </TouchableOpacity>
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
          <RadioButtonPanel
            buttons={handlers}
            selected={this.state.handler}
            onSelect={handler => this.setState({ handler })}
          />

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
  xButton: {
    marginLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
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
  },
  header: {
    paddingTop: 20,
    backgroundColor: LIGHT_GREY,
    borderColor: GREY,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
})
