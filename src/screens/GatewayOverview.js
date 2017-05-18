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

import MapView from 'react-native-maps'

import { BLUE, MID_GREY, DARK_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'

import ClipboardToggle from '../components/ClipboardToggle'
import ContentBlock from '../components/ContentBlock'
import GatewayStatusDot from '../components/GatewayStatusDot'
import TagLabel from '../components/TagLabel'

import _ from 'lodash'
import copy from '../constants/copy'
import { connect } from 'react-redux'
import { frequencyPlans, routers } from '../constants/gateway'

import Ionicons from 'react-native-vector-icons/Ionicons'

import * as TTNGatewayActions from '../scopes/content/gateways/actions'
import type { TTNGateway } from '../scopes/content/gateways/types'

import moment from 'moment'

type Props = {
  gateway: TTNGateway,
  getGatewayAsync: typeof TTNGatewayActions.getGatewayAsync,
}

type State = {
  initialLoad: boolean,
  isRefreshing: boolean,
}

class GatewayOverview extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params && navigation.state.params.gatewayId) || '',
  })
  props: Props
  state: State = {
    initialLoad: false,
    isRefreshing: false,
  }
  componentDidMount() {
    this._fetchGateway(true)
  }

  _fetchGateway = async (initialLoad = false) => {
    const { gateway, getGatewayAsync } = this.props

    if (!initialLoad) this.setState({ isRefreshing: true })
    await getGatewayAsync(gateway)

    if (!initialLoad) {
      this.setState({ isRefreshing: false })
    } else {
      this.setState({ initialLoad: true })
    }
  }
  _renderStatus(gateway: TTNGateway) {
    const lastSeen = gateway.status && gateway.status.time / (1000 * 1000)

    // always print actual seconds instead of 'a few seconds ago'
    moment.relativeTimeThreshold('ss', 0)

    const statusMsg = lastSeen ? moment(lastSeen).fromNow() : copy.NEVER_SEEN
    return (
      <View style={styles.statusContainer}>
        <GatewayStatusDot gateway={gateway} />
        <Text style={styles.statusMsg}>{statusMsg}</Text>
      </View>
    )
  }

  render() {
    const { gateway } = this.props
    if (!gateway) return <View />

    const frequencyPlanObj = _.find(frequencyPlans, {
      value: gateway.frequency_plan,
    })
    const frequencyPlan = frequencyPlanObj
      ? frequencyPlanObj.label
      : 'No frequency plan listed'
    const routerObj = _.find(routers, { value: gateway.router.id })
    const router = routerObj ? routerObj.label : 'No router listed'

    if (!this.state.initialLoad) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />
    } else if (this.state.initialLoad && !gateway) {
      return (
        <Text onPress={this._fetchGateway}>
          No Gateways found. Tap here to refresh
        </Text>
      )
    } else {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._fetchGateway}
            />
          }
        >

          <ContentBlock heading={copy.GATEWAY_OVERVIEW}>
            <Text style={styles.header}>Gateway ID</Text>
            <TagLabel orange>{gateway.id}</TagLabel>
            <Text style={styles.header}>Description</Text>
            <Text style={styles.content}>{gateway.attributes.description}</Text>
            <Text style={styles.header}>Owner</Text>
            <Text style={styles.content}>
              {gateway.owner.username || 'No owner listed'}
            </Text>
            <Text style={styles.header}>Frequency plan</Text>
            <Text style={styles.content}>
              {frequencyPlan}
            </Text>
            <Text style={styles.header}>Router</Text>
            <Text style={styles.content}>
              {router}
            </Text>
            <Text style={styles.header}>Gateway key</Text>
            <ClipboardToggle type="base64" sensitive value={gateway.key} />
          </ContentBlock>

          <ContentBlock heading={copy.STATUS}>
            <Text style={styles.header}>Connection</Text>
            {this._renderStatus(gateway)}
            <Text style={styles.header}>Received Messages</Text>
            <Text style={styles.content}>
              {gateway.status ? gateway.status.rx_ok : 0}
            </Text>
            <Text style={styles.header}>Transmitted Messages</Text>
            <Text style={styles.content}>
              {gateway.status ? gateway.status.tx_in : 0}
            </Text>
          </ContentBlock>

          <ContentBlock heading={copy.INFORMATION}>
            <Text style={styles.header}>Brand</Text>
            <Text style={styles.content}>{gateway.attributes.brand}</Text>
            <Text style={styles.header}>Model</Text>
            <Text style={styles.content}>{gateway.attributes.model}</Text>
            <Text style={styles.header}>Antenna</Text>
            <Text style={styles.content}>
              {gateway.attributes.antenna_model}
            </Text>
          </ContentBlock>

          <ContentBlock heading={copy.LOCATION}>
            {gateway.antenna_location
              ? <View>
                  <Text style={styles.header}>Antenna placement</Text>
                  <Text style={styles.content}>
                    {gateway.attributes.placement}
                  </Text>
                  <Text style={styles.header}>Altitude</Text>
                  <Text style={styles.content}>
                    {gateway.antenna_location.altitude}
                  </Text>
                  <View style={styles.mapContainer}>
                    <MapView
                      scrollEnabled={false}
                      style={styles.map}
                      initialRegion={{
                        latitude: gateway.antenna_location.latitude,
                        longitude: gateway.antenna_location.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                      }}
                    >
                      <MapView.Marker
                        anchor={{ x: 0.5, y: 1 }}
                        centerOffset={{ x: 0.5, y: 1 }}
                        coordinate={{
                          latitude: gateway.antenna_location.latitude,
                          longitude: gateway.antenna_location.longitude,
                        }}
                        title={gateway.id}
                        description={gateway.attributes.description}
                      >
                        <Ionicons
                          name={'ios-pin'}
                          style={{ color: BLUE }}
                          size={50}
                        />
                      </MapView.Marker>
                    </MapView>
                  </View>
                </View>
              : <Text>{copy.NOT_FOUND}</Text>}
          </ContentBlock>
        </ScrollView>
      )
    }
  }
}

export default connect(
  (state, props) => ({
    gateway: state.content.gateways.dictionary[
      props.navigation.state.params.gatewayId
    ],
  }),
  TTNGatewayActions
)(GatewayOverview)

const styles = StyleSheet.create({
  header: {
    fontFamily: LATO_REGULAR,
    color: DARK_GREY,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
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
  content: {
    fontFamily: LATO_REGULAR,
    color: MID_GREY,
    fontSize: 16,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusMsg: {
    color: DARK_GREY,
    fontFamily: LATO_REGULAR,
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 20,
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
