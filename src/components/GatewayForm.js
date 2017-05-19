//@flow

import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BLUE, GREY, LIGHT_GREY, WHITE } from '../constants/colors'
import { LEAGUE_SPARTAN } from '../constants/fonts'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps'

import CancelButton from '../components/CancelButton'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import RadioButtonPanel from '../components/RadioButtonPanel'
import SubmitButton from '../components/SubmitButton'

import * as TTNGatewayActions from '../scopes/content/gateways/actions'
import { getClosestOption } from '../utils/locationUtils'
import { frequencyPlans, routers } from '../constants/gateway'
import { connect } from 'react-redux'
import _ from 'lodash'

const BUTTON_SIZE = 60
const ZOOMED_OUT_DELTA = 30
const ZOOMED_IN_DELTA = 0.02
let DEFAULT_LOCATION = {
  latitude: 0,
  longitude: 0,
}

type Props = {
  onCancel: Function,
  onSubmit: Function,
  addGatewayAsync: typeof TTNGatewayActions.addGatewayAsync,
}

type State = {
  description: string,
  descriptionValid: boolean,
  frequencyPlan: string,
  hasLocation: boolean,
  id: string,
  idValid: boolean,
  inProgress: boolean,
  location: Object,
  mapEditEnabled: boolean,
  placement: string,
  router: string,
}

class GatewayForm extends Component {
  props: Props
  state: State = {
    description: '',
    descriptionValid: false,
    frequencyPlan: frequencyPlans[0].value,
    hasLocation: false,
    id: '',
    idValid: false,
    inProgress: false,
    location: DEFAULT_LOCATION,
    mapEditEnabled: false,
    placement: 'indoor',
    router: routers[0].value,
  }
  _mapView = null
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        DEFAULT_LOCATION = {
          latitude,
          longitude,
        }

        this.setState({
          hasLocation: true,
          location: {
            latitude,
            longitude,
          },
          frequencyPlan: getClosestOption(position.coords, frequencyPlans)
            .value,
          router: getClosestOption(position.coords, routers).value,
        })

        if (this._mapView !== null) {
          setTimeout(() => {
            this._mapView.animateToRegion(
              {
                ...DEFAULT_LOCATION,
                latitudeDelta: ZOOMED_IN_DELTA,
                longitudeDelta: ZOOMED_IN_DELTA,
              },
              500
            )
          }, 1500)
        }
      },
      err => {
        console.log('# geolocation fail', err)
      }
    )
  }

  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'gatewayId':
        this.setState({ id: text.toLowerCase() })
        break
      case 'gatewayDescription':
        this.setState({ description: text })
        break
    }
  }
  _onValidate = (isValid, formInputId) => {
    switch (formInputId) {
      case 'gatewayId':
        this.setState({ idValid: isValid })
        break
      case 'gatewayDescription':
        this.setState({ descriptionValid: isValid })
        break
    }
  }
  _onSubmit = async () => {
    const { addGatewayAsync } = this.props
    let loc = {}
    if (this.state.hasLocation) loc['antenna_location'] = this.state.location
    let body = {
      ...loc,
      id: this.state.id,
      attributes: {
        description: this.state.description,
        placement: this.state.placement,
      },
      router: this.state.router,
      frequency_plan: this.state.frequencyPlan,
    }
    this.setState({ inProgress: true })
    await addGatewayAsync(body)
    this.setState({ inProgress: false })
    this.props.onSubmit()
  }
  _allInputsValid() {
    return this.state.idValid && this.state.descriptionValid
  }

  _resetMap = async () => {
    this.setState({
      hasLocation: false,
      location: DEFAULT_LOCATION,
    })
    this._mapView &&
      this._mapView.animateToRegion(
        {
          ...DEFAULT_LOCATION,
          latitudeDelta: ZOOMED_OUT_DELTA,
          longitudeDelta: ZOOMED_OUT_DELTA,
        },
        500
      )
  }
  render() {
    const { onCancel } = this.props
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.xButton}>
            <Ionicons name={'ios-close-outline'} size={40} />
          </TouchableOpacity>
          <Text style={styles.formTitle}>ADD GATEWAY</Text>
        </View>
        <View style={styles.container}>

          <FormLabel
            primaryText="Gateway ID"
            secondaryText="A unique identifier for your gateway"
          />
          <FormInput
            id="gatewayId"
            validationType="applicationId"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.id}
            required
          />

          <FormLabel
            primaryText="Description"
            secondaryText="A human readable description of your gateway."
          />
          <FormInput
            id="gatewayDescription"
            validationType="gatewayDescription"
            onChangeText={this._onChangeText}
            onValidate={this._onValidate}
            value={this.state.description}
          />

          <FormLabel primaryText="Frequency plan" />
          <RadioButtonPanel
            buttons={_.map(frequencyPlans)}
            selected={this.state.frequencyPlan}
            onSelect={frequencyPlan => this.setState({ frequencyPlan })}
          />

          <FormLabel
            primaryText="Router registration"
            secondaryText="To reduce latency, pick a router that is in a region which is close to the location of the router itself."
          />
          <RadioButtonPanel
            buttons={_.map(routers)}
            selected={this.state.router}
            onSelect={router => this.setState({ router })}
          />

          <FormLabel
            primaryText="Location"
            secondaryText="This will be used if your gateway cannot determine its location by itself. Set a location by tapping on the map while in Edit mode."
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
                latitudeDelta: ZOOMED_OUT_DELTA,
                longitudeDelta: ZOOMED_OUT_DELTA,
              }}
              onPress={e => {
                if (this.state.mapEditEnabled) {
                  if (!this.state.hasLocation)
                    this.setState({ hasLocation: true })
                  this.setState({ location: e.nativeEvent.coordinate })
                  this._mapView &&
                    this._mapView.animateToCoordinate(e.nativeEvent.coordinate)
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
                >
                  <Ionicons
                    name={'ios-pin'}
                    style={[
                      { color: BLUE },
                      Platform.OS == 'ios' && { top: -25 },
                    ]}
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
                {this.state.mapEditEnabled
                  ? 'Done'
                  : this.state.hasLocation ? 'Edit' : 'Add'}
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
          <FormLabel primaryText={'Antenna placement'} />
          <RadioButtonPanel
            buttons={[
              { label: 'indoor', value: 'indoor' },
              { label: 'outdoor', value: 'outdoor' },
            ]}
            onSelect={placement => this.setState({ placement })}
            selected={this.state.placement}
          />
          <View>
            <View style={styles.buttonRow}>
              <CancelButton onPress={onCancel} style={styles.cancelButton} />
              <SubmitButton
                active={this._allInputsValid()}
                inProgress={this.state.inProgress}
                onPress={this._onSubmit}
                style={styles.submitButton}
                title="Add gateway"
              />
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

export default connect(null, TTNGatewayActions)(GatewayForm)

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
  mapContainer: {
    marginTop: 20,
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    borderColor: LIGHT_GREY,
    borderWidth: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 3,
  },
})
