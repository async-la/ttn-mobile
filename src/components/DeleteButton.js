//@flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ConfirmAlert from './ConfirmAlert'

import { LATO_REGULAR } from '../constants/fonts'
import { RED, LIGHT_RED } from '../constants/colors'

import copy from '../constants/copy'

type Props = {
  title?: string,
  confirm?: boolean,
  confirmButtonTitle?: string,
  confirmMessage?: string,
  inProgress?: boolean,
  itemToDeleteTitle?: string,
  onConfirm?: Function,
  onDeny?: Function,
  onPress?: () => void,
  small?: boolean,
  style?: Object,
}

class DeleteButton extends Component {
  props: Props
  _showDeleteConfirmation = () => {
    const {
      confirmButtonTitle = copy.DELETE,
      itemToDeleteTitle = copy.THIS_ITEM,
      confirmMessage = `${copy.CONFIRM_DELETE} ${itemToDeleteTitle}?`,
      onConfirm,
      onDeny,
    } = this.props
    ConfirmAlert({
      title: copy.CAUTION,
      message: confirmMessage,
      confirmButtonTitle: confirmButtonTitle,
      denyButtonTitle: copy.CANCEL,
      onConfirm,
      onDeny,
    })
  }
  _onPress = () => {
    const { confirm = true, onPress } = this.props
    if (confirm) this._showDeleteConfirmation()
    onPress && onPress()
  }
  render() {
    const { inProgress, title, small, style } = this.props
    return (
      <TouchableOpacity
        style={[!small && styles.buttonLarge, title && styles.buttonRow, style]}
        onPress={this._onPress}
      >
        {inProgress
          ? <ActivityIndicator
              color={RED}
              style={[
                small
                  ? styles.activityIndicatorSmall
                  : styles.activityIndicatorLarge,
              ]}
            />
          : <View
              style={(title && styles.buttonRow, small && styles.buttonSmall)}
            >
              <Ionicons
                name={small ? 'md-remove' : 'ios-trash-outline'}
                size={small ? 10 : 30}
                style={[
                  styles.icon,
                  small ? styles.iconSmall : styles.iconLarge,
                ]}
              />
            </View>}
        {title &&
          <Text
            style={[
              !small && styles.textLarge,
              small && styles.buttonTitleSmall,
            ]}
          >
            {title}
          </Text>}
      </TouchableOpacity>
    )
  }
}

export default DeleteButton

const styles = StyleSheet.create({
  activityIndicatorLarge: {
    width: 30,
    height: 30,
  },
  activityIndicatorSmall: {
    width: 20,
    height: 20,
  },
  buttonLarge: {
    backgroundColor: LIGHT_RED,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: RED,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: RED,
    width: 20,
    height: 20,
  },
  buttonTitleSmall: {
    color: RED,
    fontFamily: LATO_REGULAR,
    fontSize: 15,
    marginLeft: 10,
  },
  icon: {
    color: RED,
  },
  iconLarge: {
    width: 30,
    height: 30,
  },
  iconSmall: {
    color: LIGHT_RED,
  },
  textLarge: {
    color: RED,
    marginLeft: 10,
    fontSize: 17,
  },
})
