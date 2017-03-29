// @flow

import { AppState, Dimensions } from 'react-native'
import {
  RESET,
  SET_APP_STATE,
  SET_KEYBOARD_STATUS,
  SET_NETWORK_STATUS,
  SET_VIEWPORT,
} from './types'
import type {
  AppStatePayload,
  DeviceAction,
  KeyboardStatusPayload,
  NetworkStatusPayload,
  ViewportPayload,
} from './types'

export type State = {
  appState: ?string,
  keyboard: ?KeyboardStatusPayload,
  networkStatus: ?NetworkStatusPayload,
  viewport: ?ViewportPayload,
};

export const initialState: State = {
  appState: AppState.currentState,

  keyboard: {
    visible: false,
    layout: {},
  },

  networkStatus: {
    isConnected: true,
  },

  viewport: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
}

export default (state: State = initialState, action: DeviceAction) => {
  switch (action.type) {
    case RESET:
      return { ...initialState }

    case SET_APP_STATE:
      return {
        ...state,
        appState: action.payload,
      }

    case SET_KEYBOARD_STATUS:
      return {
        ...state,
        keyboard: action.payload,
      }

    case SET_NETWORK_STATUS:
      return {
        ...state,
        networkStatus: {
          isConnected: action.payload,
        },
      }

    case SET_VIEWPORT:
      return {
        ...state,
        viewport: action.payload,
      }

    default:
      return state
  }
}
