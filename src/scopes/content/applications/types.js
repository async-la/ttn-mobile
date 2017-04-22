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

export type Device = {
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

export type ReceiveTTNApplicationAction = {
  type: 'content/RECEIVE_TTN_APPLICATION',
  payload: TTNApplication,
}

export type ReceiveTTNApplicationsAction = {
  type: 'content/RECEIVE_TTN_APPLICATIONS',
  payload: Array<TTNApplication>,
}

export type TTNApplicationAction =
  | ReceiveTTNApplicationAction
  | ReceiveTTNApplicationsAction
