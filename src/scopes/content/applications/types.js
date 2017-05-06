// @flow

export type AccessKey = {
  name: string,
  key: string,
  rights: Array<string>,
}

export type AccessKeyOptions = {
  name: string,
  rights: Array<string>,
}

export type Collaborator = {
  username: string,
  rights: Array<string>,
}

export type TTNDevice = {
  app_eui: ?string,
  app_id?: string,
  app_key?: string,
  app_skey?: string,
  description?: ?string,
  dev_addr?: string,
  dev_eui?: string,
  dev_id: ?string,
  disable_fcnt_check?: boolean,
  fcnt_down?: string,
  fcnt_up?: string,
  last_seen?: string,
  method?: string,
  nwk_skey?: string,
  uses_32bit_fcnt?: boolean,
}

export type TTNApplication = {
  id: string,
  name?: string,
  euis?: Array<string>,
  access_keys?: Array<AccessKey>,
  created?: string,
  collaborators?: Array<Collaborator>,
  handler?: string,
  rights?: Array<string>,
}

export const RECEIVE_TTN_APPLICATION = 'content/RECEIVE_TTN_APPLICATION'
export const RECEIVE_TTN_APPLICATIONS = 'content/RECEIVE_TTN_APPLICATIONS'
export const RECEIVE_TTN_DEVICE = 'content/RECEIVE_TTN_DEVICE'
export const RECEIVE_TTN_DEVICES = 'content/RECEIVE_TTN_DEVICES'

export type ReceiveTTNApplicationAction = {
  type: 'content/RECEIVE_TTN_APPLICATION',
  payload: TTNApplication,
}

export type ReceiveTTNApplicationsAction = {
  type: 'content/RECEIVE_TTN_APPLICATIONS',
  payload: Array<TTNApplication>,
}

export type ReceiveTTNDeviceAction = {
  type: 'content/RECEIVE_TTN_DEVICE',
  payload: TTNDevice,
}

export type ReceiveTTNDevicesAction = {
  type: 'content/RECEIVE_TTN_DEVICES',
  payload: Array<TTNDevice>,
}

export type TTNApplicationAction =
  | ReceiveTTNApplicationAction
  | ReceiveTTNApplicationsAction
  | ReceiveTTNDeviceAction
  | ReceiveTTNDevicesAction
