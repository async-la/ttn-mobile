//@flow
import React, { Component } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import copy from '../constants/copy'
import { OTAA, ABP } from '../constants/application'

import CheckBox from '../components/CheckBox'
import ClipboardToggle from '../components/ClipboardToggle'
import ContentBlock from '../components/ContentBlock'
import DeleteButton from '../components/DeleteButton'
import FormLabel from '../components/FormLabel'
import FormInput from '../components/FormInput'
import RadioButtonPanel from '../components/RadioButtonPanel'
import SubmitButton from '../components/SubmitButton'
import WarningText from '../components/WarningText'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import type { Device } from '../scopes/content/applications/types'

import { connect } from 'react-redux'
import { splitHex } from '../utils/payloadConversion'

const BUTTON_SIZE = 60

type Props = {
  navigation: Object,
  getDeviceAsync: Function,
  deleteDeviceAsync: Function,
  updateDeviceAsync: Function,
}

type State = {
  activationMethod: string,
  appEui: ?string,
  originalAppEui: string,
  description: ?string,
  device: Device,
  originalDescription: ?string,
  frameCounterChecks: boolean,
  originalFrameCounterChecks: boolean,
  frameCounterWidth: string,
  originalFrameCounterWidth: ?string,
  inProgressDelete: boolean,
  inProgressSave: boolean,
  isValid: boolean,
}

class DeviceSettings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deviceId,
  })
  props: Props
  state: State = {
    activationMethod: OTAA,
    appEui: '',
    originalAppEui: '',
    description: '',
    device: {
      app_eui: null,
      dev_id: null,
    },
    originalDescription: '',
    frameCounterChecks: true,
    originalFrameCounterChecks: true,
    frameCounterWidth: '16',
    originalFrameCounterWidth: '',
    inProgressDelete: false,
    inProgressSave: false,
    isValid: false,
  }
  componentDidMount() {
    this._getDevice()
  }

  _getDevice = async () => {
    const { application } = this.props.navigation.state.params
    const { dev_id } = this.props.navigation.state.params.device
    const device = await this.props.getDeviceAsync(application, dev_id)
    this.setState({
      appEui: device.app_eui,
      originalAppEui: device.app_eui,
      description: device.description,
      originalDescription: device.description,
      frameCounterWidth: device.uses_32bit_fcnt ? '32' : '16',
      originalFrameCounterWidth: device.uses_32bit_fcnt ? '32' : '16',
      frameCounterChecks: !device.disable_fcnt_check,
      originalFrameCounterChecks: !device.disable_fcnt_check,
      device,
    })
  }
  _onChangeText = text => {
    this.setState({ description: text })
  }
  _onValidate = isValid => {
    this.setState({ isValid })
  }
  _deleteDevice = async () => {
    const { application, device } = this.props.navigation.state.params
    const { deleteDeviceAsync } = this.props
    this.setState({ inProgressDelete: true })
    await deleteDeviceAsync(application, device)
    this.setState({ inProgressDelete: false })
    this.props.navigation.goBack(null)
  }
  _cancelDeleteDevice = () => {}
  _settingsHaveChanged = () => {
    const appEuiHasChanged = this.state.appEui !== this.state.originalAppEui
    const descriptionHasChanged =
      this.state.description !== this.state.originalDescription
    const frameCounterWidthHasChanged =
      this.state.frameCounterWidth !== this.state.originalFrameCounterWidth
    const disableFrameCounterChecksHasChanged =
      this.state.frameCounterChecks !== this.state.originalFrameCounterChecks
    return (
      appEuiHasChanged ||
      descriptionHasChanged ||
      frameCounterWidthHasChanged ||
      disableFrameCounterChecksHasChanged
    )
  }
  _saveDevice = async () => {
    const { updateDeviceAsync } = this.props
    const { application } = this.props.navigation.state.params
    const { dev_eui, dev_id, app_key, app_skey, nwk_skey } = this.state.device

    this.setState({ inProgressSave: true })

    let keys = {}
    if (app_key) keys['app_key'] = app_key
    if (app_skey) keys['app_skey'] = app_skey
    if (nwk_skey) keys['nwk_skey'] = nwk_skey

    const updatedDevice = {
      ...keys,
      app_eui: this.state.appEui,
      description: this.state.description,
      dev_eui,
      disable_fcnt_check: !this.state.frameCounterChecks,
      method: this.state.activationMethod,
      uses_32bit_fcnt: this.state.frameCounterWidth === '32',
    }

    const device = await updateDeviceAsync(application, dev_id, updatedDevice)
    if (device)
      this.setState({
        originalAppEui: device.app_eui,
        originalDescription: device.description,
        originalFrameCounterChecks: !device.disable_fcnt_check,
        originalFrameCounterWidth: device.uses_32bit_fcnt ? '32' : '16',
      })
    this.setState({ inProgressSave: false })
  }
  _renderOTAA() {
    const device = this.state.device.dev_id
      ? this.state.device
      : this.props.navigation.state.params.device
    return (
      <View>
        <FormLabel primaryText={copy.APP_KEY} />
        <View style={styles.clipBoardRow}>
          <ClipboardToggle
            password
            value={device.app_key}
            style={{ flex: 1 }}
          />
        </View>

      </View>
    )
  }

  _renderABP() {
    return (
      <View style={{ padding: 20 }}>
        <Text>{copy.ABP_KEYS_GENERATED}</Text>
      </View>
    )
  }

  render() {
    const { application } = this.props.navigation.state.params

    const { device } = this.state
    const appEuis = application.euis.map(eui => ({
      label: splitHex(eui),
      value: eui,
    }))
    const frameCounterWidths = [
      { label: '16 bit', value: '16' },
      { label: '32 bit', value: '32' },
    ]
    const activationMethods = [
      { label: OTAA, value: OTAA },
      { label: ABP, value: ABP },
    ]
    return (
      <View style={{ flex: 1 }}>
        {!device.dev_id
          ? <ActivityIndicator size="large" style={styles.activityIndicator} />
          : <ScrollView style={styles.container}>
              <ContentBlock heading={copy.GENERAL}>

                <FormLabel primaryText={copy.DESCRIPTION} />
                <FormInput
                  onChangeText={this._onChangeText}
                  onValidate={this._onValidate}
                  value={this.state.description}
                />

                <FormLabel primaryText={copy.DEVICE_EUI} />
                <View style={styles.clipBoardRow}>
                  <ClipboardToggle value={device.dev_eui} style={{ flex: 1 }} />
                </View>

                <FormLabel primaryText={copy.APPLICATION_EUI} />
                <RadioButtonPanel
                  buttons={appEuis}
                  selected={this.state.appEui}
                  onSelect={appEui => this.setState({ appEui })}
                />

                <FormLabel primaryText={copy.ACTIVATION_METHOD} />
                <RadioButtonPanel
                  buttons={activationMethods}
                  selected={this.state.activationMethod}
                  onSelect={activationMethod =>
                    this.setState({ activationMethod })}
                />

                {this.state.activationMethod === OTAA
                  ? this._renderOTAA()
                  : this._renderABP()}
                <FormLabel primaryText={copy.FRAME_COUNTER_WIDTH} />
                <RadioButtonPanel
                  buttons={frameCounterWidths}
                  selected={this.state.frameCounterWidth}
                  onSelect={frameCounterWidth =>
                    this.setState({ frameCounterWidth })}
                />
                <CheckBox
                  primaryText={copy.FRAME_COUNTER_CHECKS}
                  selected={this.state.frameCounterChecks}
                  onPress={() =>
                    this.setState({
                      frameCounterChecks: !this.state.frameCounterChecks,
                    })}
                />
                {!this.state.frameCounterChecks &&
                  <WarningText>{copy.FRAME_COUNTER_CHECK_WARNING}</WarningText>}

                <View style={{ height: 30 }} />

                <SubmitButton
                  active={this._settingsHaveChanged()}
                  inProgress={this.state.inProgressSave}
                  onPress={this._saveDevice}
                  style={styles.submitButton}
                  title={copy.SAVE}
                />

                <View style={{ height: 50 }} />

              </ContentBlock>
              <DeleteButton
                title={`${copy.DELETE} ${copy.DEVICE}`.toUpperCase()}
                confirm
                inProgress={this.state.inProgressDelete}
                itemToDeleteTitle={`${copy.DEVICE} ${device.dev_id || ''}`}
                onConfirm={this._deleteDevice}
                onDeny={this._cancelDeleteDevice}
                style={styles.deleteDeviceButton}
              />

            </ScrollView>}
      </View>
    )
  }
}

export default connect(null, TTNApplicationActions)(DeviceSettings)

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 30,
  },
  container: {
    flex: 1,
  },
  clipboard: {
    marginTop: 10,
  },
  deleteDeviceButton: {
    width: BUTTON_SIZE * 4,
    height: BUTTON_SIZE,
    alignSelf: 'center',
    marginBottom: 15,
  },
  clipBoardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
  },
  submitButton: {
    width: BUTTON_SIZE * 4,
    height: BUTTON_SIZE,
    alignSelf: 'center',
  },
})
