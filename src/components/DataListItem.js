// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import TagLabel from '../components/TagLabel'

import { BLUE, WHITE } from '../constants/colors'
import { LATO_REGULAR } from '../constants/fonts'
import { base64toHEX } from '../utils/payloadConverstion'
import moment from 'moment'

type Props = {
  data: Object,
};

export default class DataListItem extends Component {
  props: Props;

  render() {
    const { data } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.caret}>
          <Text style={styles.dataColumnHeading} />
          <FontAwesome name="caret-up" size={20} style={{ color: BLUE }} />
        </View>
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
          <View style={styles.dataColumn}>
            <Text style={styles.dataColumnHeading} />
            <TagLabel>{base64toHEX(data.payload_raw, true)}</TagLabel>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  caret: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  dataRow: {
    backgroundColor: WHITE,
    borderRadius: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    minHeight: 50,
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
})
