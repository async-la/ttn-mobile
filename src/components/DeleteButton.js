//@flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ConfirmAlert from './ConfirmAlert'

import { RED, LIGHT_RED } from '../constants/colors'

type Props = {
  buttonTitle?: string,
  confirm?: boolean,
  inProgress?: boolean,
  itemToDeleteTitle?: string,
  onConfirm?: Function,
  onDeny?: Function,
  onPress?: () => void,
  small?: boolean,
  style?: Object,
};

class DeleteButton extends Component {
  props: Props;
  _showDeleteConfirmation = () => {
    const { itemToDeleteTitle = 'this item', onConfirm, onDeny } = this.props
    ConfirmAlert({
      title: 'Caution',
      message: `Are you sure you want to delete ${itemToDeleteTitle}?`,
      confirmButtonTitle: 'Delete',
      denyButtonTitle: 'Cancel',
      onConfirm,
      onDeny,
    })
  };
  _onPress = () => {
    const { confirm = true, onPress } = this.props
    if (confirm) this._showDeleteConfirmation()
    onPress && onPress()
  };
  render() {
    const { inProgress, buttonTitle = 'DELETE', small, style } = this.props
    return (
      <TouchableOpacity
        style={[styles.button, small && styles.buttonSmall, style]}
        onPress={this._onPress}
      >
        {inProgress
          ? <ActivityIndicator color={RED} />
          : <Ionicons
            name={small ? 'md-remove' : 'ios-trash-outline'}
            size={small ? 10 : 30}
            style={[styles.icon, small && styles.iconSmall]}
            />}
        {!small && <Text style={styles.text}>{buttonTitle}</Text>}
      </TouchableOpacity>
    )
  }
}

export default DeleteButton

const styles = StyleSheet.create({
  button: {
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
  buttonSmall: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: RED,
    width: 20,
    height: 20,
  },
  icon: {
    color: RED,
  },
  iconSmall: {
    color: LIGHT_RED,
  },
  text: {
    color: RED,
    marginLeft: 10,
    fontSize: 17,
  },
})
