// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ContentBlock from '../components/ContentBlock'
import TagLabel from '../components/TagLabel'
import { FormattedMessage } from 'react-intl'

import { LATO_REGULAR } from '../constants/fonts'
import { connect } from 'react-redux'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import type { TTNApplication } from '../scopes/content/applications/types'

import moment from 'moment'

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
    title: ({ state }) => state.params.appName,
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

  _renderCollaborators(collaborators) {
    return collaborators.map(collaborator => {
      const labels = collaborator.rights.map(right => (
        <View key={right} style={styles.collaboratorLabels}>
          <TagLabel>{right}</TagLabel>
        </View>
      ))
      return (
        <View key={collaborator.username} style={styles.collaborators}>
          <Text style={styles.collaboratorName}>{collaborator.username}</Text>
          <View style={styles.labelsWrapper}>{labels}</View>
        </View>
      )
    })
  }

  _renderAccessKeys(accessKeys) {
    return accessKeys.map(accessKey => {
      const labels = accessKey.rights.map(right => (
        <View key={right} style={styles.collaboratorLabels}>
          <TagLabel>{right}</TagLabel>
        </View>
      ))
      return (
        <View key={accessKey.name} style={styles.collaborators}>
          <Text style={styles.collaboratorName}>{accessKey.name}</Text>
          {/* <Text style={styles.collaboratorName}>{accessKey.key}</Text> */}
          <View style={styles.labelsWrapper}>{labels}</View>
        </View>
      )
    })
  }

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
          <ContentBlock
            heading={
              <FormattedMessage
                id="app.label.application.overview"
                defaultMessage="APPLICATION OVERVIEW"
              />
            }
          >
            <View>
              <Text style={styles.header}>Application ID</Text>
              <TagLabel orange>{application.id}</TagLabel>
            </View>
            <Text style={styles.header}>Description</Text>
            <Text>{application.name}</Text>

            <Text style={styles.header}>Created</Text>
            <Text>{moment(application.created).fromNow()}</Text>

            <Text style={styles.header}>Handler</Text>
            <Text>{application.handler}</Text>

          </ContentBlock>
          <ContentBlock
            heading={
              <FormattedMessage
                id="app.label.application.eui"
                defaultMessage="APPLICATION EUIS"
              />
            }
          >
            <Text>{application.euis.join(',')}</Text>
          </ContentBlock>

          <ContentBlock
            heading={
              <FormattedMessage
                id="app.label.application.devices"
                defaultMessage="DEVICES"
              />
            }
          >
            <Text>{this.state.devices.length}</Text>
          </ContentBlock>

          <ContentBlock
            heading={
              <FormattedMessage
                id="app.label.application.collaborators"
                defaultMessage="COLLABORATORS"
              />
            }
          >
            {application.collaborators &&
              this._renderCollaborators(application.collaborators)}
          </ContentBlock>

          <ContentBlock
            heading={
              <FormattedMessage
                id="app.label.application.accessKeys"
                defaultMessage="ACCESS KEYS"
              />
            }
          >
            {application.access_keys &&
              this._renderAccessKeys(application.access_keys)}
          </ContentBlock>
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
    fontWeight: 'bold',
    marginVertical: 5,
  },
  collaborators: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  collaboratorName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  collaboratorLabels: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginRight: 10,
    marginBottom: 10,
  },
  labelsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})
