// @flow

import {
  RESET,
  SET_APP_STATE,
  SET_KEYBOARD_STATUS,
  SET_NETWORK_STATUS,
  SET_VIEWPORT,
} from './types'
import type {
  AppStatePayload,
  KeyboardStatusPayload,
  NetworkStatusPayload,
  ViewportPayload,
  ResetDeviceAction,
  SetAppStateAction,
  SetKeyboardStatusAction,
  SetNetworkStatusAction,
  SetViewportAction,
} from './types'

export function resetDevice(): ResetDeviceAction {
  return { type: RESET }
}

export function setAppState(payload: AppStatePayload): SetAppStateAction {
  return { type: SET_APP_STATE, payload: payload }
}

export function setKeyboardStatus(
  payload: KeyboardStatusPayload
): SetKeyboardStatusAction {
  return { type: SET_KEYBOARD_STATUS, payload: payload }
}

export function setNetworkStatus(
  payload: NetworkStatusPayload
): SetNetworkStatusAction {
  return { type: SET_NETWORK_STATUS, payload: payload }
}

export function setViewport(payload: ViewportPayload): SetViewportAction {
  return { type: SET_VIEWPORT, payload: payload }
}
