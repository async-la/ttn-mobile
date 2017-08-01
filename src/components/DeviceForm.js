//@flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Button,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native'

import { BLACK, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import copy from '../constants/copy'

import Ionicons from 'react-native-vector-icons/Ionicons'

import CancelButton from '../components/CancelButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import QRCodeScanner from '../components/QRCodeScanner'
import RadioButtonPanel from '../components/RadioButtonPanel'
import SubmitButton from '../components/SubmitButton'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import type { TTNApplication } from '../scopes/content/applications/types'
import { connect } from 'react-redux'
import { splitHex } from '../utils/payloadConversion'

const BUTTON_SIZE = 60

type Props = {
  application: TTNApplication,
  createEUIAsync: Function,
  onCancel: () => void,
  onSubmit: () => void,
  addDeviceAsync: Function,
  updateDeviceAsync: Function,
}

type State = {
  eui: string,
  description: string,
  id: string,
  appKey: string,
  idValid: boolean,
  inProgress: boolean,
  inProgressEUI: boolean,
  modalVisible: boolean,
  scannedQR: boolean,
}

class DeviceForm extends Component {
  props: Props
  state: State = {
    eui: '',
    id: '',
    description: '',
    appKey: '',
    idValid: false,
    inProgress: false,
    inProgressEUI: false,
    modalVisible: false,
    scannedQR: false,
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
      case 'deviceDescription':
        this.setState({ description: text })
        break
      case 'eui':
        this.setState({ eui: text })
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
    const {
      application,
      addDeviceAsync,
      createEUIAsync,
      updateDeviceAsync,
    } = this.props
    const { appKey, eui, id, description } = this.state

    this.setState({ inProgress: true })
    try {
      // Create custom defined application EUI.
      // Currently only possible through QR Code scan
      if (application.euis && application.euis.indexOf(eui) == -1) {
        await createEUIAsync(application, eui)
      }

      let device = {
        app_eui: eui,
        dev_id: id,
        app_key: appKey || null,
      }

      device = await addDeviceAsync(application, device)

      if (description) {
        device = {
          ...device,
          description,
        }
        await updateDeviceAsync(application, device.dev_id, device)
      }
      this.props.onSubmit && this.props.onSubmit()
    } catch (err) {
      console.log('# DeviceForm onSubmit error', err)
      if (err.status === 409) {
        switch (Platform.OS) {
          case 'ios':
            alert(copy.DEVICE_ID_ALREADY_REGISTERED)
            break
          case 'android':
            ToastAndroid.show(
              copy.DEVICE_ID_ALREADY_REGISTERED,
              ToastAndroid.SHORT
            )
            break
        }
      } else {
        // Likely from bad app eui or key
        alert('Unable to register device')
      }
    } finally {
      this.setState({ inProgress: false })
    }
  }
  _allInputsValid() {
    return Boolean(this.state.idValid && this.state.eui)
  }

  _addEUI = async () => {
    const { application, createEUIAsync } = this.props
    this.setState({ inProgressEUI: true })
    try {
      await createEUIAsync(application)
    } catch (err) {
      alert('Error: ' + err.status)
      console.log('# DeviceForm addEUI error', err)
    }

    this.setState({ inProgressEUI: false })
  }
  _onBarCodeRead = async event => {
    if (event.type === 'org.iso.QRCode' || event.type === 'QR_CODE') {
      Vibration.vibrate()
      this._dismissModal()
      const parsedData = JSON.parse(event.data)
      if (parsedData.dev_eui)
        this.setState({ id: parsedData.dev_eui.toLowerCase(), idValid: true })
      if (parsedData.description)
        this.setState({ description: parsedData.description })
      if (parsedData.app_eui)
        this.setState({ eui: parsedData.app_eui, scannedQR: true })
      if (parsedData.app_key) this.setState({ appKey: parsedData.app_key })
    }
  }
  _displayModal = () => {
    this.setState({ modalVisible: true })
  }
  _dismissModal = () => {
    this.setState({ modalVisible: false })
  }
  _renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={this._dismissModal}
      >
        <QRCodeScanner
          onDismiss={this._dismissModal}
          onBarCodeRead={this._onBarCodeRead}
        />
      </Modal>
    )
  }
  render() {
    const { application, onCancel } = this.props
    const euis = application.euis && application.euis.length
      ? application.euis.map(eui => ({
          label: splitHex(eui),
          value: eui,
        }))
      : []

    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.xButton}>
            <Ionicons name={'ios-close-outline'} size={40} />
          </TouchableOpacity>
          <Text style={styles.formTitle}>REGISTER DEVICE</Text>
        </View>
        <View style={styles.container}>
          <Button
            onPress={this._displayModal}
            title="Scan QR Code"
            color={BLACK}
          />
          <FormLabel
            primaryText="Device ID"
            secondaryText="This is the unique identifier for the device in this app. The device ID will be immutable."
          />
          <FormInput
            id="deviceId"
            validationType="deviceId"
            onChangeText={this._onChangeText}
            value={this.state.id.toLowerCase()}
            required
          />

          <FormLabel primaryText={`${copy.DESCRIPTION} (${copy.OPTIONAL})`} />
          <FormInput
            id="deviceDescription"
            validationType="none"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.description}
          />

          <View>
            {!this.state.scannedQR
              ? <View>
                  <FormLabel primaryText="App EUI" />
                  {application.euis &&
                    application.euis.length &&
                    <RadioButtonPanel
                      buttons={euis}
                      selected={this.state.eui}
                      onSelect={eui => this.setState({ eui })}
                    />}

                  <TouchableOpacity
                    style={styles.noEUIButton}
                    onPress={this._addEUI}
                  >
                    {!this.state.inProgressEUI
                      ? <Text style={styles.noEUIText}>
                          Generate New App EUI
                        </Text>
                      : <ActivityIndicator size="small" color={BLACK} />}
                  </TouchableOpacity>
                </View>
              : <View>
                  <FormLabel
                    primaryText="App EUI"
                    secondaryText="Application EUI's generated from the QR code scan."
                  />
                  <FormInput
                    id="eui"
                    editable={false}
                    onChangeText={this._onChangeText}
                    value={this.state.eui}
                  />
                </View>}
          </View>
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
        {this._renderModal()}

      </ScrollView>
    )
  }
}

export default connect(
  (state, props) => ({
    application: state.content.applications.dictionary[props.application.id],
  }),
  TTNApplicationActions
)(DeviceForm)

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
    color: BLACK,
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
  noEUIButton: {
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEUIText: {
    color: BLACK,
  },
})
