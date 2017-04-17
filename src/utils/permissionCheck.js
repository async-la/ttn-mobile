// @flow

import type { TTNApplication } from '../scopes/content/applications/types'

export function getMessageUplinkPermission(application: TTNApplication) {
  return application.access_keys &&
    application.access_keys.find(accessKey => {
      return accessKey.rights.find(
        right => right.indexOf('messages:up') !== -1
      )
    })
}
