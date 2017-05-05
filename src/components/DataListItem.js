// @flow

import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import ClipboardToggle from '../components/ClipboardToggle'
import TagLabel from '../components/TagLabel'
import copy from '../constants/copy'

import { BLUE, LIGHT_GREY } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'
import { base64toHEX } from '../utils/payloadConversion'
import moment from 'moment'

type Props = {
  data: Object,
}

type State = {
  heightSet: boolean,
  maxHeight: number,
  metadataHeight: Object,
  metadataOpacity: Object,
  metadataVisible: boolean,
}

export default class DataListItem extends Component {
  props: Props
  state: State = {
    animation: new Animated.Value(0),
    heightSet: false,
    maxHeight: 0,
    metadataVisible: true,
    metadataHeight: new Animated.Value(0),
    metadataOpacity: new Animated.Value(0),
  }
  _setMetadataHeight = e => {
    // We only want to get the height of each element once when it loads,
    // but onLayout gets called each time it toggles.
    // We also need to render it once with its full height in
    // order to set the animation value before hiding the element [dan]
    if (!this.state.heightSet) {
      this.setState({
        maxHeight: e.nativeEvent.layout.height,
        heightSet: true,
        metadataVisible: false,
        metadataOpacity: this.state.metadataHeight.interpolate({
          inputRange: [0, e.nativeEvent.layout.height],
          outputRange: [0.25, 1],
        }),
      })
    }
  }
  _toggleMetadata = async () => {
    const { metadataVisible } = this.state
    // stash the value of the current visibility, but then set it to true
    // because we always want to see the animation
    if (!metadataVisible) await this.setState({ metadataVisible: true })

    const toValueHeight = metadataVisible ? 0 : this.state.maxHeight

    Animated.timing(this.state.metadataHeight, {
      toValue: toValueHeight,
      duration: 350,
    }).start(() => {
      this.setState({
        metadataVisible: !metadataVisible,
      })
    })
  }
  render() {
    const { data } = this.props
    const {
      heightSet,
      metadataHeight,
      metadataOpacity,
      metadataVisible,
    } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.summary} onPress={this._toggleMetadata}>
          <View style={styles.caret}>
            <Text style={styles.dataColumnHeading} />
            <FontAwesome name="caret-up" size={20} style={{ color: BLUE }} />
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.dataRow}>
              <View style={styles.dataColumn}>
                <Text style={styles.dataColumnHeading}>time</Text>
                <Text style={styles.dataText}>
                  {moment(data.metadata.time).format('HH:mm:ss')}
                </Text>
              </View>
              <View style={styles.dataColumn}>
                <Text style={styles.dataColumnHeading}>counter</Text>
                <Text style={styles.dataText}>
                  {data.counter} {data.is_retry ? '(retry)' : ''}
                </Text>
              </View>
              <View style={styles.dataColumn}>
                <Text style={styles.dataColumnHeading}>port</Text>
                <Text style={styles.dataText}>{data.port}</Text>
              </View>
              <View style={styles.dataColumn}>
                <Text style={styles.dataColumnHeading}>dev id</Text>
                <Text style={styles.dataText}>{data.dev_id}</Text>
              </View>
              <View style={[styles.dataColumn, styles.hexLabel]}>
                <TagLabel style={{ marginTop: 10 }}>
                  {base64toHEX(data.payload_raw, true)}
                </TagLabel>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {metadataVisible &&
          <Animated.View
            onLayout={this._setMetadataHeight}
            style={[
              styles.metadataOuter,
              // Hacky way to avoid seeing a flash of white during the initial
              // render when we get height for accordion animation from onLayout. [dan]
              !heightSet
                ? { position: 'absolute' }
                : { height: metadataHeight, position: 'relative' },
              { opacity: metadataOpacity, padding: 20 },
            ]}
          >
            <Text style={styles.dataColumnHeading}>Payload</Text>
            <ClipboardToggle value={base64toHEX(data.payload_raw)} />
            <Text style={[styles.dataColumnHeading, styles.metadataTitle]}>
              {copy.METADATA}
            </Text>
            <View style={styles.metadataInner}>
              <Text style={{ margin: 20, padding: 20 }}>
                {JSON.stringify(data.metadata, null, 2)}
              </Text>
            </View>
          </Animated.View>}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  summary: {
    flexDirection: 'row',
  },
  dataContainer: {
    minHeight: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  caret: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  dataColumn: {
    marginRight: 15,
  },
  dataColumnHeading: {
    fontFamily: LATO_REGULAR,
    fontWeight: 'bold',
    marginBottom: 5,
    color: BLUE,
  },
  dataText: {
    fontFamily: LATO_REGULAR,
  },
  hexLabel: {
    alignSelf: 'center',
  },
  expandButon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  metadataInner: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    borderRadius: 5,
  },
  metadataOuter: {
    flex: 1,
    overflow: 'hidden',
    padding: 20,
  },
  metadataTitle: {
    marginTop: 10,
  },
})
