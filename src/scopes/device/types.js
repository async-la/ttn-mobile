// @flow

export const RESET = 'device/RESET'
export type ResetDeviceAction = {
  type: 'device/RESET',
};

export const SET_APP_STATE = 'device/SET_APP_STATE'
export type AppStatePayload = {
  appState: string,
};
export type SetAppStateAction = {
  type: 'device/SET_APP_STATE',
  payload: AppStatePayload,
};

export const SET_KEYBOARD_STATUS = 'device/SET_KEYBOARD_STATUS'
export type KeyboardStatusPayload = {
  visible: boolean,
  layout: Object,
};
export type SetKeyboardStatusAction = {
  type: 'device/SET_KEYBOARD_STATUS',
  payload: KeyboardStatusPayload,
};

export const SET_NETWORK_STATUS = 'device/SET_NETWORK_STATUS'
export type NetworkStatusPayload = {
  isConnected: boolean,
};
export type SetNetworkStatusAction = {
  type: 'device/SET_NETWORK_STATUS',
  payload: NetworkStatusPayload,
};

export const SET_VIEWPORT = 'device/SET_VIEWPORT'
export type ViewportPayload = {
  height: number,
  width: number,
};
export type SetViewportAction = {
  type: 'device/SET_VIEWPORT',
  payload: ViewportPayload,
};

export type DeviceAction =
  | ResetDeviceAction
  | SetAppStateAction
  | SetKeyboardStatusAction
  | SetNetworkStatusAction
  | SetViewportAction;
