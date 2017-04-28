//@flow

// Rights
export const COLLABORATORS = 'collaborators'
export const DELETE = 'delete'
export const DEVICES = 'devices'
export const MESSAGES_DOWN_W = 'messages:down:w'
export const MESSAGES_UP_R = 'messages:up:r'
export const SETTINGS = 'settings'

// settings
export const OTAA = 'OTAA'
export const ABP = 'ABP'

// Handlers
export const ASIA_SE = {
  label: 'asia-se',
  value: 'ttn-handler-asia-se',
}
export const BRAZIL = {
  label: 'brazil',
  value: 'ttn-handler-brazil',
}
export const EU = { label: 'eu', value: 'ttn-handler-eu' }
export const US_WEST = {
  label: 'us-west',
  value: 'ttn-handler-us-west',
}
export const NONE = { label: 'none', value: '' }

export const handlers = {
  ASIA_SE,
  BRAZIL,
  EU,
  US_WEST,
  NONE,
}
