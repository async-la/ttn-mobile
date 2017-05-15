//@flow
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { BLUE, WHITE } from '../constants/colors'

import ContentBlock from '../components/ContentBlock'
import CheckBox from '../components/CheckBox'
import DeleteButton from '../components/DeleteButton'
import FormLabel from '../components/FormLabel'
import FormInput from '../components/FormInput'
import RadioButtonPanel from '../components/RadioButtonPanel'
import SubmitButton from '../components/SubmitButton'
import WarningText from '../components/WarningText'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'

import copy from '../constants/copy'

import { connect } from 'react-redux'
import { frequencyPlans, routers } from '../constants/gateway'
import { validationTypes } from '../constants/validation'
import * as permissionCheck from '../utils/permissionCheck'
import * as TTNGatewayActions from '../scopes/content/gateways/actions'

const DEFAULT_LOCATION = {
  latitude: 39.8282,
  longitude: -98.5795,
}

const ZOOMED_IN_DELTA = 0.02
const ZOOMED_OUT_DELTA = 30

const DEFAULT_ALTITUDE = 0
const BUTTON_SIZE = 60

class GatewaySettings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.gateway.id,
  })
  state = {
    mapEditEnabled: false,
    hasLocation: false,
    autoUpdate: false,
    description: '',
    descriptionValid: true,
    freqPlan: '',
    originalAutoUpdate: false,
    originalDescription: '',
    originalFreqPlan: '',
    originalRouter: '',
    router: '',
    inProgressGeneral: false,
    inProgressLocation: false,
    inProgressInfo: false,
    inProgressPrivacy: false,
    inProgressDelete: false,
    location: DEFAULT_LOCATION,
    originalLocation: DEFAULT_LOCATION,
    altitude: DEFAULT_ALTITUDE,
    originalAltitude: DEFAULT_ALTITUDE,
    antennaPlacement: 'indoor',
    originalAntennaPlacement: '',
    altitudeValid: true,
    statusPublic: false,
    locationPublic: false,
    ownerPublic: false,
    originalStatusPublic: false,
    originalLocationPublic: false,
    originalOwnerPublic: false,
    brand: '',
    model: '',
    antenna: '',
    originalBrand: '',
    originalModel: '',
    originalAntenna: '',
  }
  _mapView = null
  _textInputs = []
  componentDidMount() {
    const { gateway } = this.props.navigation.state.params

    const autoUpdate = gateway.auto_update
    const freqPlan = gateway.frequency_plan
    const description = gateway.attributes.description
    const router = gateway.router.id
    const hasLocation = !!gateway.antenna_location
    const location = hasLocation
      ? {
          latitude: gateway.antenna_location.latitude,
          longitude: gateway.antenna_location.longitude,
        }
      : DEFAULT_LOCATION
    const altitude = hasLocation
      ? gateway.antenna_location.altitude
      : DEFAULT_ALTITUDE
    const antennaPlacement = gateway.attributes.placement
    const statusPublic = gateway.status_public
    const locationPublic = gateway.location_public
    const ownerPublic = gateway.owner_public
    const brand = gateway.attributes.brand ? gateway.attributes.brand : ''
    const model = gateway.attributes.model ? gateway.attributes.model : ''
    const antenna = gateway.attributes.antenna ? gateway.attributes.antenna : ''

    this.setState({
      hasLocation,
      autoUpdate,
      originalAutoUpdate: autoUpdate,
      freqPlan,
      originalFreqPlan: freqPlan,
      description,
      originalDescription: description,
      router,
      originalRouter: router,
      location,
      originalLocation: location,
      altitude,
      originalAltitude: altitude,
      antennaPlacement,
      originalAntennaPlacement: antennaPlacement,
      statusPublic,
      originalStatusPublic: statusPublic,
      locationPublic,
      originalLocationPublic: locationPublic,
      ownerPublic,
      originalOwnerPublic: ownerPublic,
      brand,
      originalBrand: brand,
      model,
      originalModel: model,
      antenna,
      originalAntenna: antenna,
    })
  }

  _onValidate = (isValid, id) => {
    switch (id) {
      case 'description':
        this.setState({ descriptionValid: isValid })
        break
      case 'altitude':
        this.setState({ altitudeValid: isValid })
        break
    }
  }
  _generalSettingsHaveChanged = () => {
    const freqPlanChanged = this.state.freqPlan !== this.state.originalFreqPlan
    const descriptionChanged =
      this.state.description !== this.state.originalDescription
    const autoUpdateChanged =
      this.state.autoUpdate !== this.state.originalAutoUpdate
    const routerChanged = this.state.router !== this.state.originalRouter
    return (
      freqPlanChanged ||
      descriptionChanged ||
      autoUpdateChanged ||
      routerChanged
    )
  }
  _generalSettingsInputsValid = () => {
    return this.state.descriptionValid
  }
  _locationSettingsHaveChanged = () => {
    const locationChanged =
      this.state.location.latitude !== this.state.originalLocation.latitude ||
      this.state.location.longitude !== this.state.originalLocation.longitude
    const altitudeChanged = this.state.altitude !== this.state.originalAltitude
    const antennaPlacementChanged =
      this.state.antennaPlacement !== this.state.originalAntennaPlacement
    return locationChanged || altitudeChanged || antennaPlacementChanged
  }
  _locationSettingsInputsValid = () => {
    return this.state.altitudeValid
  }
  _privacySettingsHaveChanged = () => {
    const statusPublicChanged =
      this.state.statusPublic !== this.state.originalStatusPublic
    const locationPublicChanged =
      this.state.locationPublic !== this.state.originalLocationPublic
    const ownerPublicChanged =
      this.state.ownerPublic !== this.state.originalOwnerPublic
    return statusPublicChanged || locationPublicChanged || ownerPublicChanged
  }
  _infoSettingsHaveChanged = () => {
    const brandChanged = this.state.brand !== this.state.originalBrand
    const modelChanged = this.state.model !== this.state.originalModel
    const antennaChanged = this.state.antenna !== this.state.originalAntenna
    return brandChanged || modelChanged || antennaChanged
  }
  _onSubmitGeneral = async () => {
    let gateway = {
      attributes: {
        description: this.state.description,
      },
      auto_update: this.state.autoUpdate,
      description: this.state.description,
      frequency_plan: this.state.freqPlan,
      router: this.state.router,
      id: this.props.gateway.id,
    }

    this.setState({ inProgressGeneral: true })
    try {
      const updatedGateway = await this.props.updateGatewayAsync(gateway)
      this.setState({
        originalDescription: updatedGateway.attributes.description,
        originalFreqPlan: updatedGateway.frequency_plan,
        originalRouter: updatedGateway.router.id,
        originalAutoUpdate: updatedGateway.auto_update,
      })
    } catch (err) {
      console.log('## General settings submit error', err)
    } finally {
      this.setState({ inProgressGeneral: false })
    }
  }
  _onSubmitLocation = async () => {
    let gateway = {
      antenna_location: {
        altitude: this.state.altitude,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
      },
      attributes: {
        placement: this.state.antennaPlacement,
      },
      id: this.props.gateway.id,
    }

    this.setState({ inProgressLocation: true })
    try {
      const updatedGateway = await this.props.updateGatewayAsync(gateway)
      this.setState({
        originalLocation: {
          latitude: updatedGateway.antenna_location.latitude,
          longitude: updatedGateway.antenna_location.longitude,
        },
        originalAltitude: updatedGateway.antenna_location.altitude,
        originalAntennaPlacement: updatedGateway.attributes.placement,
      })
    } catch (err) {
      console.log('## Location settings submit error', err)
    } finally {
      this.setState({ inProgressLocation: false })
    }
  }
  _onSubmitPrivacy = async () => {
    const { statusPublic, ownerPublic, locationPublic } = this.state
    const gateway = {
      status_public: statusPublic,
      owner_public: ownerPublic,
      location_public: locationPublic,
      id: this.props.gateway.id,
    }

    this.setState({ inProgressPrivacy: true })
    try {
      const updatedGateway = await this.props.updateGatewayAsync(gateway)
      this.setState({
        originalStatusPublic: updatedGateway.status_public,
        originalOwnerPublic: updatedGateway.owner_public,
        originalLocationPublic: updatedGateway.location_public,
      })
    } catch (err) {
      console.log('## Privacy settings submit error', err)
    } finally {
      this.setState({ inProgressPrivacy: false })
    }
  }
  _onSubmitInfo = async () => {
    const { brand, description, model, antenna, antennaPlacement } = this.state
    let gateway = {
      id: this.props.gateway.id,
      attributes: {},
    }
    if (brand) gateway.attributes['brand'] = brand
    if (model) gateway.attributes['model'] = model
    if (antenna) gateway.attributes['antenna_model'] = antenna
    gateway.attributes['placement'] = antennaPlacement
    gateway.attributes['description'] = description

    this.setState({ inProgressInfo: true })
    try {
      const updatedGateway = await this.props.updateGatewayAsync(gateway)
      this.setState({
        originalBrand: updatedGateway.attributes.brand
          ? updatedGateway.attributes.brand
          : '',
        originalModel: updatedGateway.attributes.model
          ? updatedGateway.attributes.model
          : '',
        originalAntenna: updatedGateway.attributes.antenna_model
          ? updatedGateway.attributes.antenna_model
          : '',
      })
    } catch (err) {
      console.log('## Info settings submit error', err)
    } finally {
      this.setState({ inProgressInfo: false })
    }
  }
  _onConfirmDelete = async () => {
    const { gateway } = this.props
    this.setState({ inProgressDelete: true })
    try {
      await this.props.deleteGatewayAsync(gateway)
      await this.props.getGatewaysAsync()
      this.props.navigation.goBack(null)
    } catch (err) {
      console.log('## Delete gateway error', err)
    } finally {
      this.setState({ inProgressDelete: false })
    }
  }
  _resetMap = async () => {
    if (this.state.originalLocation === DEFAULT_LOCATION)
      await this.setState({ hasLocation: false })
    this.setState({
      location: this.state.originalLocation,
    })
    this._mapView &&
      this._mapView.animateToRegion(
        {
          latitude: this.state.originalLocation.latitude,
          longitude: this.state.originalLocation.longitude,
          latitudeDelta: this.state.hasLocation
            ? ZOOMED_IN_DELTA
            : ZOOMED_OUT_DELTA,
          longitudeDelta: this.state.hasLocation
            ? ZOOMED_IN_DELTA
            : ZOOMED_OUT_DELTA,
        },
        500
      )
  }
  render() {
    const { gateway } = this.props
    if (!gateway) return <View />
    return (
      <KeyboardAwareScrollView
        getTextInputRefs={() => this._textInputs}
        scrollToInputAdditionalOffset={120} // Compensate for TabBarTop on iOS, may be able to generate this value based on TabBar height [dan]
      >

        <ContentBlock heading="GENERAL">
          <FormLabel
            primaryText={copy.DESCRIPTION}
            secondaryText={'A human-readable description of the gateway'}
          />
          <FormInput
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
            onValidate={this._onValidate}
            id="description"
            validationType={validationTypes.GATEWAY_DESCRIPTION}
          />

          <FormLabel
            primaryText={copy.FREQUENCY_PLAN}
            secondaryText={'The frequency plan this gateway will use'}
          />
          <RadioButtonPanel
            buttons={frequencyPlans}
            onSelect={freqPlan => this.setState({ freqPlan })}
            selected={this.state.freqPlan}
          />

          <FormLabel
            primaryText={copy.ROUTER}
            secondaryText={
              'The address of the router your gateway will connect to.'
            }
          />
          <RadioButtonPanel
            buttons={routers}
            onSelect={router => this.setState({ router })}
            selected={this.state.router}
          />

          <CheckBox
            primaryText={copy.AUTOMATICALLY_UPDATE_GATEWAY}
            secondaryText={
              'If enabled the gateway will periodically check if updates are available and perform them.'
            }
            selected={this.state.autoUpdate}
            onPress={() => {
              this.setState({ autoUpdate: !this.state.autoUpdate })
            }}
          />

          {this.state.autoUpdate &&
            <WarningText>
              {copy.AUTOMATICALLY_UPDATE_GATEWAY_WARNING}
            </WarningText>}

          <SubmitButton
            title={'Save general settings'}
            inProgress={this.state.inProgressGeneral}
            active={this._generalSettingsHaveChanged()}
            onPress={this._onSubmitGeneral}
            style={styles.submitButton}
          />
        </ContentBlock>

        {permissionCheck.gatewayHasLocationRights(gateway) &&
          <ContentBlock heading="LOCATION">
            <FormLabel
              primaryText={copy.LOCATION}
              secondaryText={'The exact location of this gateway'}
            />
            <View style={styles.mapContainer}>
              <MapView
                ref={i => (this._mapView = i)}
                style={styles.map}
                scrollEnabled={this.state.mapEditEnabled}
                pitchEnabled={false}
                initialRegion={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: this.state.hasLocation
                    ? ZOOMED_IN_DELTA
                    : ZOOMED_OUT_DELTA,
                  longitudeDelta: this.state.hasLocation
                    ? ZOOMED_IN_DELTA
                    : ZOOMED_OUT_DELTA,
                }}
                onPress={e => {
                  if (this.state.mapEditEnabled) {
                    if (!this.state.hasLocation)
                      this.setState({ hasLocation: true })
                    this.setState({ location: e.nativeEvent.coordinate })
                    this._mapView &&
                      this._mapView.animateToCoordinate(
                        e.nativeEvent.coordinate
                      )
                  }
                }}
              >
                {this.state.hasLocation &&
                  <MapView.Marker
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                    coordinate={{
                      latitude: this.state.location.latitude,
                      longitude: this.state.location.longitude,
                    }}
                    title={gateway.id}
                    description={gateway.attributes.description}
                  >
                    <Ionicons
                      name={'ios-pin'}
                      style={{ color: BLUE }}
                      size={50}
                    />
                  </MapView.Marker>}
              </MapView>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: WHITE,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  borderBottomLeftRadius: 5,
                  width: 70,
                }}
                onPress={() =>
                  this.setState({ mapEditEnabled: !this.state.mapEditEnabled })}
              >
                <Text style={{ color: BLUE }}>
                  {this.state.mapEditEnabled ? 'Done' : 'Edit'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: WHITE,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderTopLeftRadius: 5,
                  width: 70,
                }}
                onPress={this._resetMap}
              >
                <Text style={{ color: BLUE }}>Reset</Text>
              </TouchableOpacity>
            </View>
            <FormLabel
              primaryText={'Altitude'}
              secondaryText={'The altitude of the gateway in meters'}
            />
            <FormInput
              ref={i => {
                if (i && this._textInputs.indexOf(i) === -1)
                  this._textInputs.push(i)
              }}
              value={this.state.altitude}
              onChangeText={altitude =>
                this.setState({ altitude: Number(altitude) })}
              onValidate={this._onValidate}
              validationType={validationTypes.NUMBER}
              id="altitude"
              keyboardType="numeric"
            />

            <FormLabel primaryText={'Antenna placement'} />
            <RadioButtonPanel
              buttons={[
                { label: 'indoor', value: 'indoor' },
                { label: 'outdoor', value: 'outdoor' },
              ]}
              onSelect={antennaPlacement => this.setState({ antennaPlacement })}
              selected={this.state.antennaPlacement}
            />

            <SubmitButton
              inProgress={this.state.inProgressLocation}
              active={
                this._locationSettingsHaveChanged() &&
                  this._locationSettingsInputsValid()
              }
              title="Save location"
              onPress={this._onSubmitLocation}
              style={styles.submitButton}
            />
          </ContentBlock>}

        <ContentBlock heading="PRIVACY">
          <CheckBox
            primaryText={'Make status public'}
            secondaryText={
              'Allow others to get uptime information about this gateway'
            }
            selected={this.state.statusPublic}
            onPress={() =>
              this.setState({ statusPublic: !this.state.statusPublic })}
          />
          <CheckBox
            primaryText={'Make location public'}
            secondaryText={
              'Allow others to know the exact location of this gateway'
            }
            selected={this.state.locationPublic}
            onPress={() =>
              this.setState({ locationPublic: !this.state.locationPublic })}
          />
          <CheckBox
            primaryText={'Make owner public'}
            secondaryText={'Allow others to know the owner of this gateway'}
            selected={this.state.ownerPublic}
            onPress={() =>
              this.setState({ ownerPublic: !this.state.ownerPublic })}
          />
          <SubmitButton
            inProgress={this.state.inProgressPrivacy}
            active={this._privacySettingsHaveChanged()}
            title="Save privacy settings"
            onPress={this._onSubmitPrivacy}
            style={styles.submitButton}
          />
        </ContentBlock>

        <ContentBlock heading="INFORMATION">
          <FormLabel primaryText={'Brand'} />
          <FormInput
            ref={i => {
              if (i && this._textInputs.indexOf(i) === -1)
                this._textInputs.push(i)
            }}
            value={this.state.brand}
            onChangeText={brand => this.setState({ brand })}
            onValidate={this._onValidate}
            id="brand"
            validationType={validationTypes.NONE}
          />
          <FormLabel primaryText={'Model'} />
          <FormInput
            ref={i => {
              if (i && this._textInputs.indexOf(i) === -1)
                this._textInputs.push(i)
            }}
            value={this.state.model}
            onChangeText={model => this.setState({ model })}
            onValidate={this._onValidate}
            id="model"
            validationType={validationTypes.NONE}
          />
          <FormLabel primaryText={'Antenna'} />
          <FormInput
            ref={i => {
              if (i && this._textInputs.indexOf(i) === -1)
                this._textInputs.push(i)
            }}
            value={this.state.antenna}
            onChangeText={antenna => this.setState({ antenna })}
            onValidate={this._onValidate}
            id="antenna"
            validationType={validationTypes.NONE}
          />
          <SubmitButton
            inProgress={this.state.inProgressInfo}
            active={this._infoSettingsHaveChanged()}
            title="Save info settings"
            onPress={this._onSubmitInfo}
            style={styles.submitButton}
          />
        </ContentBlock>

        {permissionCheck.gatewayHasDeleteRights(gateway) &&
          <DeleteButton
            small
            onConfirm={this._onConfirmDelete}
            inProgress={this.state.inProgressDelete}
            title={`Delete gateway`}
            itemToDeleteTitle={`gateway ${gateway.id}`}
            style={{ marginVertical: 30 }}
          />}
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(
  (state, props) => ({
    gateway: state.content.gateways.dictionary[
      props.navigation.state.params.gatewayId
    ],
  }),
  TTNGatewayActions
)(GatewaySettings)

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 20,
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  submitButton: {
    height: BUTTON_SIZE,
    width: 200,
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
})
