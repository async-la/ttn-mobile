// @flow

import {
  RECEIVE_TTN_APPLICATION,
  RECEIVE_TTN_APPLICATIONS,
} from './applications/types'

import { RECEIVE_GATEWAY, RECEIVE_GATEWAYS } from './gateways/types'

import { RESET_AUTH } from '../auth/types'

import type { TTNApplicationAction, TTNApplication } from './applications/types'
import type { GatewayAction, Gateway } from './gateways/types'
import _ from 'lodash'

type ContentAction = TTNApplicationAction | GatewayAction

type TTNApplicationDictionary = {
  [key: string]: TTNApplication,
}

type GatewayDictionary = {
  [key: string]: Gateway,
}

export type State = {
  applications: {
    list: Array<string>,
    dictionary: TTNApplicationDictionary,
  },
  gateways: {
    list: Array<string>,
    dictionary: GatewayDictionary,
  },
}

export const initialState: State = {
  applications: {
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

    case RECEIVE_GATEWAY: {
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

    case RECEIVE_GATEWAYS: {
      const incomingDictionary: GatewayDictionary = _.keyBy(
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
