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
import ApplicationListItem from '../components/ApplicationListItem'

import { APPLICATIONS_LABEL } from '../scopes/navigation/constants'
import { LIGHT_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import { connect } from 'react-redux'

type Props = {
  applications: Object,
  getApplicationsAsync: typeof TTNApplicationActions.getApplicationsAsync,
  navigation: Object,
};

type State = {
  initialLoad: boolean,
  modalVisible: boolean,
  isRefreshing: boolean,
};

class ApplicationsList extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: APPLICATIONS_LABEL,
    }),
  };

  props: Props;
  state: State = {
    initialLoad: false,
    modalVisible: false,
    isRefreshing: false,
  };

  componentDidMount() {
    this._fetchApplications(true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.isRefreshing && nextState.isRefreshing) {
      return false
    } else {
      return true
    }
  }

  _fetchApplications = async (initialLoad = false) => {
    if (!initialLoad) this.setState({ isRefreshing: true })

    await this.props.getApplicationsAsync()

    if (!initialLoad) {
      this.setState({ isRefreshing: false })
    } else {
      this.setState({ initialLoad: true })
    }
  };

  _renderApplicationRow(id) {
    const application = this.props.applications.dictionary[id]
    return (
      <ApplicationListItem
        application={application}
        navigation={this.props.navigation}
      />
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
    } else if (this.state.initialLoad && !this.props.applications.list) {
      return (
        <Text onPress={this._fetchApplications}>
          No Applications found. Tap here to refresh
        </Text>
      )
    } else {
      return (
        <FlatList
          data={this.props.applications.list}
          initialListSize={this.props.applications.list.length}
          keyExtractor={item => item}
          renderItem={({ item }) => this._renderApplicationRow(item)}
          ItemSeparatorComponent={Separator}
          style={styles.list}
          onRefresh={this._fetchApplications}
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
  state => ({
    applications: state.content.applications,
  }),
  TTNApplicationActions
)(ApplicationsList)

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
