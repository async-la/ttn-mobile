//@flow

import { ASIA_SE, EU, US_WEST, BRAZIL, NONE, locations } from './location'

// Rights
export const COLLABORATORS = 'collaborators'
export const DELETE = 'delete'
export const DEVICES = 'devices'
export const MESSAGES_DOWN_W = 'messages:down:w'
export const MESSAGES_UP_R = 'messages:up:r'
export const SETTINGS = 'settings'

// Settings
export const OTAA = 'OTAA'
export const ABP = 'ABP'

// Handlers
const asiaSeHandler = {
  label: 'asia-se',
  value: 'ttn-handler-asia-se',
  location: locations[ASIA_SE],
}
const brazilHandler = {
  label: 'brazil',
  value: 'ttn-handler-brazil',
  location: locations[BRAZIL],
}
const euHandler = {
  label: 'eu',
  value: 'ttn-handler-eu',
  location: locations[EU],
}
const usWestHandler = {
  label: 'us-west',
  value: 'ttn-handler-us-west',
  location: locations[US_WEST],
}
export const noneHandler = {
  label: 'none',
  value: '',
  location: locations[NONE],
}

export const handlers = [
  asiaSeHandler,
  brazilHandler,
  euHandler,
  usWestHandler,
  noneHandler,
]
