// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import AddButton from '../components/AddButton'
import GatewayForm from '../components/GatewayForm'
import GatewayListItem from '../components/GatewayListItem'

import { GATEWAYS_LABEL } from '../scopes/navigation/constants'
import { LATO_REGULAR } from '../constants/fonts'
import { BLACK, LIGHT_GREY, WHITE } from '../constants/colors'

import * as TTNGatewayActions from '../scopes/content/gateways/actions'

import type { Connector } from 'react-redux'

type OwnProps = {
  navigation: Object,
}

type Props = {
  gateways: Object,
  getGatewaysAsync: typeof TTNGatewayActions.getGatewaysAsync,
} & OwnProps

type State = {
  initialLoad: boolean,
  isRefreshing: boolean,
  modalVisible: boolean,
}

class GatewayList extends Component {
  static navigationOptions = {
    title: GATEWAYS_LABEL,
  }
  props: Props
  state: State = {
    initialLoad: false,
    isRefreshing: false,
    modalVisible: false,
  }
  componentDidMount() {
    this._fetchGateways(true)
  }

  _fetchGateways = async (initialLoad = false) => {
    if (!initialLoad) this.setState({ isRefreshing: true })

    await this.props.getGatewaysAsync()

    if (!initialLoad) {
      this.setState({ isRefreshing: false })
    } else {
      this.setState({ initialLoad: true })
    }
  }
  _renderModal() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={this._dismissModal}
      >
        <GatewayForm
          onCancel={this._dismissModal}
          onSubmit={this._dismissModal}
        />
      </Modal>
    )
  }

  _dismissModal = () => {
    this.setState({ modalVisible: false })
  }
  _renderGatewayRow(id) {
    const gateway = this.props.gateways.dictionary[id]
    return (
      <GatewayListItem gateway={gateway} navigation={this.props.navigation} />
    )
  }

  _renderContent() {
    if (!this.state.initialLoad) {
      return <ActivityIndicator size="large" color={BLACK} />
    } else if (this.state.initialLoad && !this.props.gateways.list) {
      return (
        <Text onPress={this._fetchGateways}>
          No Gateways found. Tap here to refresh
        </Text>
      )
    } else {
      return (
        <FlatList
          data={this.props.gateways.list}
          initialListSize={this.props.gateways.list.length}
          keyExtractor={item => item}
          renderItem={({ item }) => this._renderGatewayRow(item)}
          ItemSeparatorComponent={Separator}
          style={styles.list}
          onRefresh={this._fetchGateways}
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
        <AddButton onPress={() => this.setState({ modalVisible: true })} />
      </View>
    )
  }
}

const Separator = () => <View style={styles.separator} />

const connector: Connector<OwnProps, Props> = connect(
  state => ({
    gateways: state.content.gateways,
  }),
  TTNGatewayActions
)
export default connector(GatewayList)

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
