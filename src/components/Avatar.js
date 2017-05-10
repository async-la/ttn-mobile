//@flow

import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import { connect } from 'react-redux'
import type { User } from '../scopes/auth/types'

type Props = {
  onPress?: Function,
  size?: number,
  user: ?User,
}

const Avatar = ({ onPress, size = 40, user }: Props) => {
  const borderRadius = {
    borderRadius: size,
  }

  const imageSize = {
    width: size,
    height: size,
    borderRadius: size * 0.5,
  }

  if (!user || !user.avatarURI) return <View />

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.avatar, borderRadius]}>
        <Image
          style={imageSize}
          source={{ uri: `${user.avatarURI}?=${Date.now()}` }}
        />
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={[styles.avatar, borderRadius]}>
        <Image
          style={imageSize}
          source={{ uri: `${user.avatarURI}?=${Date.now()}` }}
        />
      </View>
    )
  }
}

export default connect(state => ({
  user: state.auth.user,
}))(Avatar)

const styles = StyleSheet.create({
  avatar: {
    top: 0,
    left: 0,
    flex: 0,
    overflow: 'hidden',
  },
  avatarImage: {
    borderWidth: 1,
  },
})
