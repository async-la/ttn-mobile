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
import DeviceListItem from '../components/DeviceListItem'

import { LIGHT_GREY, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'

type Props = {
  application: Object,
  getApplicationDevicesAsync: typeof TTNApplicationActions.getApplicationDevicesAsync,
  navigation: Object,
};

type State = {
  addButtonDisabled: boolean,
  devices: Array<Object>,
  initialLoad: boolean,
  modalVisible: boolean,
  isRefreshing: boolean,
};

class DevicesList extends Component {
  props: Props;
  state: State = {
    addButtonDisabled: false,
    devices: [],
    initialLoad: false,
    modalVisible: false,
    isRefreshing: false,
  };

  static navigationOptions = {
    title: ({ state }) => state.params.appName,
  };

  componentDidMount() {
    if (!this.props.application.handler)
      this.setState({ addButtonDisabled: true })
    this._fetchApplicationDevices(true)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.application.handler && !this.state.addButtonDisabled)
      this.setState({ addButtonDisabled: true })
    else if (this.state.addButtonDisabled)
      this.setState({ addButtonDisabled: false })
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
  };

  _renderDeviceRow(device) {
    return (
      <DeviceListItem device={device} navigation={this.props.navigation} />
    )
  }

  _renderModal() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
      >
        <View style={{ marginTop: 40, marginLeft: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Add Application
          </Text>
          <Text>I'm a form!</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#3498db',
              padding: 20,
              marginTop: 20,
              width: 100,
              borderRadius: 5,
            }}
            onPress={() => {
              this.setState({ modalVisible: false })
            }}
          >
            <Text style={{ color: WHITE, fontWeight: 'bold' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  };
  _preventModal = () => {
    if (Platform.OS === 'android')
      ToastAndroid.show(
        'You must register a handler before adding a device',
        ToastAndroid.SHORT
      )
    else {
      Alert.alert(
        'Alert',
        'You must register a handler before adding a device'
      )
    }
  };
  _renderContent = () => {
    if (!this.state.initialLoad) {
      return <ActivityIndicator size="large" />
    } else if (this.state.initialLoad && this.state.devices.length === 0) {
      return (
        <TouchableOpacity onPress={this._fetchApplicationDevices}>
          <Text>No Devices found. Tap here to refresh</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <FlatList
          data={this.state.devices}
          initialListSize={this.state.devices.length}
          keyExtractor={item => item.dev_id}
          renderItem={({ item }) => this._renderDeviceRow(item)}
          ItemSeparatorComponent={Separator}
          style={styles.list}
          onRefresh={this._fetchApplicationDevices}
          refreshing={this.state.isRefreshing}
        />
      )
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this._renderContent()}
        {this._renderModal()}
        {this._renderModalToggle()}
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
    backgroundColor: LIGHT_GREY,
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
