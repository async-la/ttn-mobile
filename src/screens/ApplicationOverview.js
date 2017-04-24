// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BLUE } from '../constants/colors'
import { DEVICE_LIST } from '../scopes/navigation/constants'
import { LATO_REGULAR } from '../constants/fonts'

import ClipboardToggle from '../components/ClipboardToggle'
import ContentBlock from '../components/ContentBlock'
import TagLabel from '../components/TagLabel'

import copy from '../constants/copy'
import { connect } from 'react-redux'

import * as TTNApplicationActions from '../scopes/content/applications/actions'
import type { TTNApplication } from '../scopes/content/applications/types'

import moment from 'moment'

type Props = {
  application: TTNApplication,
  getApplicationDevicesAsync: Function,
  getApplicationAsync: typeof TTNApplicationActions.getApplicationAsync,
  navigation: Object,
}

type State = {
  devices: Array<Object>,
  initialLoad: boolean,
  isRefreshing: boolean,
}

class ApplicationOverview extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.appName,
  })
  props: Props
  state: State = {
    devices: [],
    initialLoad: false,
    isRefreshing: false,
  }
  componentDidMount() {
    this._fetchApplication(true)
  }

  _fetchApplication = async (initialLoad = false) => {
    const {
      application,
      getApplicationAsync,
      getApplicationDevicesAsync,
    } = this.props

    if (!initialLoad) this.setState({ isRefreshing: true })
    await getApplicationAsync(application)
    const devices = await getApplicationDevicesAsync(application)

    if (!initialLoad) {
      this.setState({ isRefreshing: false, devices })
    } else {
      this.setState({ initialLoad: true, devices })
    }
  }
  _navigateToDevices = () => {
    this.props.navigation.navigate(DEVICE_LIST, {
      appId: this.props.application.id,
    })
  }
  _renderCollaborators(collaborators) {
    return (
      <ContentBlock heading={copy.COLLABORATORS}>
        {collaborators.map(collaborator => {
          const labels = collaborator.rights.map(right => (
            <View key={right} style={styles.collaboratorLabels}>
              <TagLabel>{right}</TagLabel>
            </View>
          ))
          return (
            <View key={collaborator.username} style={styles.collaborators}>
              <Text style={styles.collaboratorName}>
                {collaborator.username}
              </Text>
              <View style={styles.labelsWrapper}>{labels}</View>
            </View>
          )
        })}
      </ContentBlock>
    )
  }

  _renderAccessKeys(accessKeys) {
    return accessKeys.map(accessKey => {
      const labels = accessKey.rights.map(right => (
        <View key={right} style={styles.collaboratorLabels}>
          <TagLabel>{right}</TagLabel>
        </View>
      ))
      return (
        <View key={accessKey.key} style={{ alignItems: 'flex-start' }}>
          <Text style={styles.collaboratorName}>{accessKey.name}</Text>
          <ClipboardToggle
            style={{ marginVertical: 15 }}
            type="base64"
            sensitive
            value={accessKey.key}
          />
          <View style={styles.labelsWrapper}>{labels}</View>
        </View>
      )
    })
  }

  _renderApplicationEUIS(euis) {
    return (
      <ContentBlock heading={copy.APPLICATION_EUI}>
        {euis.map(eui => (
          <ClipboardToggle key={eui} style={{ marginBottom: 10 }} value={eui} />
        ))}
      </ContentBlock>
    )
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
          <ContentBlock heading={copy.APPLICATION_OVERVIEW}>
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

          {application.euis && this._renderApplicationEUIS(application.euis)}

          <ContentBlock heading={copy.DEVICES}>
            <TouchableOpacity
              style={styles.deviceButton}
              onPress={this._navigateToDevices}
            >
              <Image
                resizeMode="contain"
                source={require('../assets/device.png')}
                style={styles.deviceButtonImage}
              />
              <Text style={styles.deviceButtonText}>
                {this.state.devices ? this.state.devices.length : 0}
              </Text>
              <Text
              >{`registered ${this.state.devices && this.state.devices.length === 1 ? 'device' : 'devices'}`}</Text>
            </TouchableOpacity>
          </ContentBlock>

          <ContentBlock heading={copy.ACCESS_KEYS}>
            {application.access_keys &&
              this._renderAccessKeys(application.access_keys)}
          </ContentBlock>

          {application.collaborators &&
            this._renderCollaborators(application.collaborators)}

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
)(ApplicationOverview)

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
  deviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceButtonImage: {
    width: 100,
    height: 50,
    margin: 10,
  },
  deviceButtonText: {
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
    fontSize: 18,
    color: BLUE,
    margin: 10,
  },
})
