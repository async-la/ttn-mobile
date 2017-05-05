// @flow

import {
  RECEIVE_TTN_APPLICATION,
  RECEIVE_TTN_APPLICATIONS,
  RECEIVE_TTN_DEVICE,
  RECEIVE_TTN_DEVICES,
} from './applications/types'

import { RECEIVE_TTN_GATEWAY, RECEIVE_TTN_GATEWAYS } from './gateways/types'

import { RESET_AUTH } from '../auth/types'

import type {
  TTNApplicationAction,
  TTNApplication,
  TTNDevice,
} from './applications/types'
import type { TTNGatewayAction, TTNGateway } from './gateways/types'
import _ from 'lodash'

type ContentAction = TTNApplicationAction | TTNGatewayAction

type TTNApplicationDictionary = {
  [key: string]: TTNApplication,
}

type TTNDeviceDictionary = {
  [key: string]: TTNDevice,
}

type TTNGatewayDictionary = {
  [key: string]: TTNGateway,
}

export type State = {
  applications: {
    list: Array<string>,
    dictionary: TTNApplicationDictionary,
  },
  devices: {
    list: Array<string>,
    dictionary: TTNDeviceDictionary,
  },
  gateways: {
    list: Array<string>,
    dictionary: TTNGatewayDictionary,
  },
}

export const initialState: State = {
  applications: {
    list: [],
    dictionary: {},
  },
  devices: {
    list: [],
    dictionary: {},
  },
  gateways: {
    list: [],
    dictionary: {},
  },
}

export default (state: State = initialState, action: ContentAction) => {
  switch (action.type) {
    case RESET_AUTH:
      return initialState

    case RECEIVE_TTN_APPLICATION: {
      const application = action.payload

      let dictionary = {
        ...state.applications.dictionary,
        [application.id]: application,
      }

      return {
        ...state,
        applications: {
          list: _.uniq([...state.applications.list, ...[application.id]]),
          dictionary,
        },
      }
    }

    case RECEIVE_TTN_APPLICATIONS: {
      const incomingDictionary: TTNApplicationDictionary = _.keyBy(
        action.payload,
        'id'
      )
      const incomingList: Array<string> = _.map(action.payload, 'id')

      return {
        ...state,
        applications: {
          list: incomingList,
          dictionary: incomingDictionary,
        },
      }
    }

    case RECEIVE_TTN_DEVICE: {
      const device: TTNDevice = action.payload
      let dictionary
      // workaround for nullable type dev_id
      if (device.dev_id) {
        dictionary = {
          ...state.devices.dictionary,
          [device.dev_id]: device,
        }
      } else {
        dictionary = {
          ...state.devices.dictionary,
        }
      }

      return {
        ...state,
        devices: {
          list: _.uniq([...state.devices.list, ...[device.dev_id]]),
          dictionary,
        },
      }
    }

    case RECEIVE_TTN_DEVICES: {
      const incomingDictionary: TTNApplicationDictionary = _.keyBy(
        action.payload,
        'dev_id'
      )
      const incomingList: Array<string> = _.map(action.payload, 'dev_id')

      return {
        ...state,
        devices: {
          list: incomingList,
          dictionary: incomingDictionary,
        },
      }
    }

    case RECEIVE_TTN_GATEWAY: {
      const gateway = action.payload

      let dictionary = {
        ...state.gateways.dictionary,
        [gateway.id]: gateway,
      }

      return {
        ...state,
        gateways: {
          list: _.uniq([...state.gateways.list, ...[gateway.id]]),
          dictionary,
        },
      }
    }

    case RECEIVE_TTN_GATEWAYS: {
      const incomingDictionary: TTNGatewayDictionary = _.keyBy(
        action.payload,
        'id'
      )
      const incomingList: Array<string> = _.map(action.payload, 'id')

      return {
        ...state,
        gateways: {
          list: incomingList,
          dictionary: incomingDictionary,
        },
      }
    }

    default:
      return state
  }
}
