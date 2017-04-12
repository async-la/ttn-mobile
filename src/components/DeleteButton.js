//@flow

import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ConfirmAlert from './ConfirmAlert'

import { RED, LIGHT_RED } from '../constants/colors'

type Props = {
  confirm?: boolean,
  inProgress?: boolean,
  itemToDeleteTitle?: string,
  onConfirm?: Function,
  onDeny?: Function,
  onPress?: () => void,
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
    const { inProgress, style } = this.props
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={this._onPress}>
        {inProgress
          ? <ActivityIndicator color={RED} />
          : <Ionicons
            name="ios-trash-outline"
            size={30}
            style={{ color: RED }}
            />}
      </TouchableOpacity>
    )
  }
}

export default DeleteButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: LIGHT_RED,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: RED,
  },
})
