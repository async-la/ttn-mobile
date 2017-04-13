// @flow
import { AppState, Dimensions } from 'react-native'
import { kv } from '../orchestrator'

import type { KV } from 'redux-reduce/src/reducers/kv'
import type {
  AppStatePayload,
  KeyboardStatusPayload,
  NetworkStatusPayload,
  ViewportPayload,
} from './types'

// AppState
let [setAppState, getAppState]: KV<AppStatePayload> = kv({
  key: 'appState',
  init: AppState.currentState,
})
export { setAppState, getAppState }

// KeyboardStatus
let [setKeyboardStatus, getKeyboardStatus]: KV<KeyboardStatusPayload> = kv({
  key: 'keyboardStatus',
  init: { visible: false, layout: {} },
})
export { setKeyboardStatus, getKeyboardStatus }

// NetworkStatus
let [setNetworkStatus, getNetworkStatus]: KV<NetworkStatusPayload> = kv({
  key: 'networkStatus',
  init: {
    isConnected: true,
  },
})
export { setNetworkStatus, getNetworkStatus }

// Viewport
let [setViewport, getViewport]: KV<ViewportPayload> = kv({
  key: 'viewport',
  init: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
})
export { setViewport, getViewport }
