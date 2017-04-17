// @flow

import type { TTNApplication } from '../scopes/content/applications/types'

const regions = ['eu', 'asia-se', 'brazil', 'us-west']

export function getApplicationMQTTHost(application: TTNApplication) {
  if (!application.handler) {
    throw new Error('Application does not have a registered handler.')
  }
  const region = application.handler.replace(/ttn-handler-/g, '').trim()

  if (regions.includes(region)) {
    return region.concat('.thethings.network')
  } else {
    throw new Error("Invalid The Things Network region '" + region + "'")
  }
}
