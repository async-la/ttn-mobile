//@flow

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
export const ASIA_SE = {
  label: 'ttn-handler-asia-se',
  value: 'ttn-handler-asia-se',
}
export const BRAZIL = {
  label: 'ttn-handler-brazil',
  value: 'ttn-handler-brazil',
}
export const EU = { label: 'ttn-handler-eu', value: 'ttn-handler-eu' }
export const US_WEST = {
  label: 'ttn-handler-us-west',
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

// Text input validation types
export const validationTypes = {
  ACCESS_KEY: 'accessKey',
  APPLICATION_ID: 'applicationId',
  APPLICATION_DESCRIPTION: 'applicationDescription',
  DEVICE_ID: 'deviceId',
  EMAIL: 'email',
  NONE: 'none',
  USERNAME: 'username',
}
