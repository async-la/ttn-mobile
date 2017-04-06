// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import AddButton from '../components/AddButton'
import DeviceListItem from '../components/DeviceListItem'

import { LIGHT_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'

type Props = {
  getApplicationDevicesAsync: typeof TTNApplicationActions.getApplicationDevicesAsync,
  navigation: Object,
};

type State = {
  devices: Array<Object>,
  initialLoad: boolean,
  modalVisible: boolean,
  isRefreshing: boolean,
};

class DevicesList extends Component {
  props: Props;
  state: State = {
    devices: [],
    initialLoad: false,
    modalVisible: false,
    isRefreshing: false,
  };

  static navigationOptions = {
    title: ({ state }) => state.params.appName,
  };

  componentDidMount() {
    this._fetchApplicationDevices(true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.isRefreshing && nextState.isRefreshing) {
      return false
    } else {
      return true
    }
  }

  _fetchApplicationDevices = async (initialLoad = false) => {
    const { getApplicationDevicesAsync, navigation } = this.props

    if (!initialLoad) this.setState({ isRefreshing: true })

    const devices = await getApplicationDevicesAsync(
      navigation.state.params.appId
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
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  _renderModalToggle() {
    return <AddButton onPress={() => this.setState({ modalVisible: true })} />
  }

  _renderContent = () => {
    if (!this.state.initialLoad) {
      return <ActivityIndicator size="large" />
    } else if (this.state.initialLoad && this.state.devices.length === 0) {
      return (
        <Text onPress={this._fetchApplicationDevices}>
          No Devices found. Tap here to refresh
        </Text>
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

export default connect(null, TTNApplicationActions)(DevicesList)

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
