// @flow

import type { TTNApplication } from '../scopes/content/applications/types'
import type { TTNGateway } from '../scopes/content/gateways/types'

export function getMessageUplinkPermission(application: TTNApplication) {
  return (
    application.access_keys &&
    application.access_keys.find(accessKey => {
      return (
        accessKey.rights &&
        accessKey.rights.find(right => right.indexOf('messages:up') !== -1)
      )
    })
  )
}

export function applicationHasSettingsRights(application: TTNApplication) {
  return application.rights && application.rights.indexOf('settings') !== -1
}

export function applicationHasDeleteRights(application: TTNApplication) {
  return application.rights && application.rights.indexOf('delete') !== -1
}

export function applicationHasDevicesRights(application: TTNApplication) {
  return application.rights && application.rights.indexOf('devices') !== -1
}

export function applicationHasCollaboratorRights(application: TTNApplication) {
  return (
    application.rights && application.rights.indexOf('collaborators') !== -1
  )
}

export function gatewayHasSettingsRights(gateway: TTNGateway) {
  return gateway.rights && gateway.rights.indexOf('gateway:settings') !== -1
}

export function gatewayHasCollaboratorRights(gateway: TTNGateway) {
  return (
    gateway.rights && gateway.rights.indexOf('gateway:collaborators') !== -1
  )
}

export function gatewayHasStatusRights(gateway: TTNGateway) {
  return gateway.rights && gateway.rights.indexOf('gateway:status') !== -1
}

export function gatewayHasDeleteRights(gateway: TTNGateway) {
  return gateway.rights && gateway.rights.indexOf('gateway:delete') !== -1
}

export function gatewayHasLocationRights(gateway: TTNGateway) {
  return gateway.rights && gateway.rights.indexOf('gateway:location') !== -1
}

export function gatewayHasOwnerRights(gateway: TTNGateway) {
  return gateway.rights && gateway.rights.indexOf('gateway:owner') !== -1
}

export function gatewayHasMessagesRights(gateway: TTNGateway) {
  return gateway.rights && gateway.rights.indexOf('gateway:messages') !== -1
}
