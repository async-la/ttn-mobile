// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'

import AddButton from '../components/AddButton'
import DeviceForm from '../components/DeviceForm'
import DeviceListItem from '../components/DeviceListItem'

import { LIGHT_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'
import { hasDevicesRights } from '../utils/permissionCheck'

type Props = {
  application: Object,
  getApplicationDevicesAsync: typeof TTNApplicationActions.getApplicationDevicesAsync,
  navigation: Object,
}

type State = {
  addButtonDisabled: boolean,
  authorized: boolean,
  devices: Array<Object>,
  initialLoad: boolean,
  modalVisible: boolean,
  isRefreshing: boolean,
}

class DevicesList extends Component {
  props: Props
  state: State = {
    authorized: false,
    addButtonDisabled: false,
    devices: [],
    initialLoad: false,
    modalVisible: false,
    isRefreshing: false,
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.appName,
  })
  componentWillMount() {
    const { application } = this.props

    if (hasDevicesRights(application)) {
      this.setState({ authorized: true })
    } else if (!application.handler) {
      this.setState({ addButtonDisabled: true })
    }

    this._fetchApplicationDevices(true)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.authorized || !nextProps.application.handler)
      this.setState({ addButtonDisabled: true })
    else this.setState({ addButtonDisabled: false })
  }

  _fetchApplicationDevices = async (initialLoad = false) => {
    const { getApplicationDevicesAsync, navigation } = this.props

    if (!initialLoad) this.setState({ isRefreshing: true })

    const devices = await getApplicationDevicesAsync(
      navigation.state.params.application
    )
    if (!initialLoad) {
      this.setState({ isRefreshing: false, devices })
    } else {
      this.setState({ initialLoad: true, devices })
    }
  }
  _renderDeviceRow(device) {
    return <DeviceListItem device={device} navigation={this.props.navigation} />
  }

  _dismissModal = () => {
    this.setState({ modalVisible: false })
  }
  _submitForm = () => {
    this._dismissModal()
    this._fetchApplicationDevices()
  }
  _renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
      >
        <DeviceForm
          application={this.props.navigation.state.params.application}
          onCancel={this._dismissModal}
          onSubmit={this._submitForm}
        />
      </Modal>
    )
  }
  _renderModalToggle() {
    return (
      <AddButton
        onPress={
          this.state.addButtonDisabled ? this._preventModal : this._displayModal
        }
        disabled={this.state.addButtonDisabled}
      />
    )
  }

  _displayModal = () => {
    this.setState({ modalVisible: true })
  }
  _preventModal = () => {
    if (Platform.OS === 'android')
      ToastAndroid.show(
        'You must register a handler before adding a device',
        ToastAndroid.SHORT
      )
    else {
      Alert.alert('Alert', 'You must register a handler before adding a device')
    }
  }
  _renderContent = () => {
    if (!this.state.initialLoad) {
      return <ActivityIndicator size="large" />
    } else if (
      this.state.initialLoad &&
      this.state.devices &&
      this.state.devices.length === 0
    ) {
      return (
        <TouchableOpacity onPress={this._fetchApplicationDevices}>
          <Text>No Devices found. Tap here to refresh</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <FlatList
          data={this.state.devices}
          initialListSize={this.state.devices ? this.state.devices.length : 0}
          keyExtractor={item => item.dev_id}
          renderItem={({ item }) => this._renderDeviceRow(item)}
          ItemSeparatorComponent={Separator}
          style={styles.list}
          onRefresh={this._fetchApplicationDevices}
          refreshing={this.state.isRefreshing}
        />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderContent()}
        {this._renderModal()}
        {this.state.authorized && this._renderModalToggle()}
      </View>
    )
  }
}

const Separator = () => <View style={styles.separator} />

export default connect(
  (state, props) => ({
    application: state.content.applications.dictionary[
      props.navigation.state.params.application.id
    ],
  }),
  TTNApplicationActions
)(DevicesList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: LIGHT_GREY,
  },
})
