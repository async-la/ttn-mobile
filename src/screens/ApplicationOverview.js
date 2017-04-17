// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import { LATO_REGULAR } from '../constants/fonts'
import headerLabel from '../components/navigation/headerLabel'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import type { TTNApplication } from '../scopes/content/applications/types'

type Props = {
  application: TTNApplication,
  getApplicationByIdAsync: typeof TTNApplicationActions.getApplicationByIdAsync,
  getApplicationDevicesAsync: typeof TTNApplicationActions.getApplicationDevicesAsync,
  navigation: Object,
};

type State = {
  devices: Array<any>,
  initialLoad: boolean,
  isRefreshing: boolean,
};

class ApplicationDetail extends Component {
  static navigationOptions = {
    header: ({ state }) => ({
      title: headerLabel(state.params.appName),
    }),
  };

  props: Props;
  state: State = {
    devices: [],
    initialLoad: false,
    isRefreshing: false,
  };

  componentDidMount() {
    this._fetchApplication(true)
  }

  _fetchApplication = async (initialLoad = false) => {
    const {
      getApplicationByIdAsync,
      getApplicationDevicesAsync,
      navigation,
    } = this.props

    if (!initialLoad) this.setState({ isRefreshing: true })

    await getApplicationByIdAsync(navigation.state.params.appId)
    const devices = await getApplicationDevicesAsync(
      navigation.state.params.appId
    )

    if (!initialLoad) {
      this.setState({ isRefreshing: false, devices })
    } else {
      this.setState({ initialLoad: true, devices })
    }
  };
  render() {
    const { application } = this.props
    if (!this.state.initialLoad) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />
    } else if (this.state.initialLoad && !application) {
      return (
        <Text onPress={this._fetchApplication}>
          No Applications found. Tap here to refresh
        </Text>
      )
    } else {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._fetchApplication}
            />
          }
        >
          <Text style={styles.header}>APPLICATION OVERVIEW</Text>
          <Text>{application.id}</Text>
          <Text>{application.name}</Text>
          <Text>{application.created}</Text>
          <Text>{application.handler}</Text>
          <Text style={styles.header}>APPLICATION EUIS</Text>
          <Text>{application.euis.join(',')}</Text>
          <Text style={styles.header}>DEVICES</Text>
          <Text>{this.state.devices.length}</Text>

          <Text style={styles.header}>COLABORATORS</Text>
          {application.collaborators &&
            application.collaborators.map((user, i) => (
              <Text key={i}>
                {user.username}
                |
                {user.rights.map((right, i) => <Text key={i}>{right}|</Text>)}
              </Text>
            ))}
          <Text style={styles.header}>ACCESS KEYS</Text>
          {application.access_keys &&
            application.access_keys.map((key, i) => (
              <Text key={i}>
                {key.key}
                |
                {key.name}
                |
                {key.rights.map((right, i) => <Text key={i}>{right}|</Text>)}
              </Text>
            ))}
        </ScrollView>
      )
    }
  }
}

export default connect(
  (state, props) => ({
    application: state.content.applications.dictionary[
      props.navigation.state.params.appId
    ],
  }),
  TTNApplicationActions
)(ApplicationDetail)

const styles = StyleSheet.create({
  header: {
    fontFamily: LATO_REGULAR,
    color: 'black',
    fontSize: 30,
  },
})
