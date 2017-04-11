// @flow

import React, { Component } from 'react'
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native'

import { BLUE } from '../constants/colors'
import * as notificationActions from '../scopes/notification/actions'
import { connect } from 'react-redux'

import type {
  Notification,
  NotificationAction,
} from '../scopes/notification/types'

const CONTAINER_HEIGHT = 75
const offPosition = -CONTAINER_HEIGHT
const onPosition = 0

type Props = {
  autoHideDuration: number,
  hideNotification: NotificationAction,
  notification: Notification,
};

class NotificationCenter extends Component {
  _timerTransitionId = () => {};
  _timerAutoHideId = () => {};
  _bannerAnim = new Animated.Value(0);
  props: Props;
  componentDidMount() {
    Animated.spring(this._bannerAnim, {
      toValue: onPosition,
      tension: 10,
      friction: 10,
    }).start()
    this.setTransitionTimer()
    this.props.notification.options.dismissible && this.setAutoHideTimer()
    this.props.notification.options.vibrate && Vibration.vibrate()
  }

  componentWillUnmount() {
    clearTimeout(this._timerAutoHideId)
    clearTimeout(this._timerTransitionId)
  }

  onTap = () => {
    const { hideNotification, notification } = this.props
    if (this._timerTransitionId || !notification.options.dismissible) return

    Animated.spring(this._bannerAnim, {
      toValue: offPosition,
      tension: 10,
      friction: 10,
    }).start(hideNotification)
  };

  autoClose = () => {
    const { hideNotification, notification } = this.props

    if (this._timerTransitionId || !notification.options.dismissible) return
    Animated.spring(this._bannerAnim, {
      toValue: offPosition,
      tension: 10,
      friction: 10,
    }).start(hideNotification)
  };

  // Timer that controls delay before click-away events are captured (based on when animation completes)
  setTransitionTimer() {
    this._timerTransitionId = setTimeout(
      () => {
        this._timerTransitionId = undefined
      },
      1000
    )
  }

  // Timer that controls delay before notification auto hides
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration || 2000
    if (autoHideDuration > 0) {
      clearTimeout(this._timerAutoHideId)
      this._timerAutoHideId = setTimeout(this.autoClose, autoHideDuration)
    }
  }

  renderNotification(notification) {
    return (
      <View style={styles.standardMessage}>
        <Text>{notification.message}</Text>
      </View>
    )
  }

  render() {
    const { notification } = this.props
    const { fromBottom } = notification.options

    const animStyle = fromBottom
      ? { bottom: this._bannerAnim }
      : { top: this._bannerAnim }

    return (
      <Animated.View
        style={[
          styles.container,
          notification.options.error && styles.error,
          animStyle,
        ]}
      >
        <StatusBar hidden />
        <TouchableOpacity onPress={this.onTap}>
          <Text>{notification.message}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

export default connect(
  state => ({ notification: state.notification }),
  notificationActions
)(NotificationCenter)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: BLUE,
    width: '100%',
    height: 75,
  },
  standardMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  error: {
    backgroundColor: 'red',
  },
})
