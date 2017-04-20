// @flow

import { AsyncStorage } from 'react-native'

import { configurePersist } from 'redux-p/src/index'

const STATE_VERSION = 1
const migrations = {}

// Static Purge State
// import purgeStoredState from 'redux-p/src/purgeStoredState'
// purgeStoredState({
//   key: 'root',
//   storage: AsyncStorage,
//   version: STATE_VERSION,
// })

export default function() {
  const { persist, createPersistor } = configurePersist()
  const persistRoot = persist(
    { key: 'root', storage: AsyncStorage, version: STATE_VERSION },
    migrations
  )
  return { persist, persistRoot, createPersistor }
}
