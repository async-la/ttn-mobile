// @flow

import type { TTNApplication } from '../scopes/content/applications/types'

export function getMessageUplinkPermission(application: TTNApplication) {
  return (
    application.access_keys &&
    application.access_keys.find(accessKey => {
      return accessKey.rights.find(right => right.indexOf('messages:up') !== -1)
    })
  )
}

export function hasSettingsRight(application: TTNApplication) {
  return (
    application.rights &&
    application.rights.find(right => right.indexOf('settings') !== -1)
  )
}

export function hasDeleteRights(application: TTNApplication) {
  return (
    application.rights &&
    application.rights.find(right => right.indexOf('delete') !== -1)
  )
}

export function hasDevicesRights(application: TTNApplication) {
  return (
    application.rights &&
    application.rights.find(right => right.indexOf('devices') !== -1)
  )
}

export function hasCollaboratorRights(application: TTNApplication) {
  return (
    application.rights &&
    application.rights.find(right => right.indexOf('collaborators') !== -1)
  )
}
