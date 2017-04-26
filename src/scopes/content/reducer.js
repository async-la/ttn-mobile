// @flow

import {
  RECEIVE_TTN_APPLICATION,
  RECEIVE_TTN_APPLICATIONS,
} from './applications/types'

import { RESET_AUTH } from '../auth/types'

import type { TTNApplicationAction, TTNApplication } from './applications/types'
import _ from 'lodash'

type TTNApplicationDictionary = {
  [key: string]: TTNApplication,
}

export type State = {
  applications: {
    list: Array<string>,
    dictionary: TTNApplicationDictionary,
  },
}

export const initialState: State = {
  applications: {
    list: [],
    dictionary: {},
  },
}

export default (state: State = initialState, action: TTNApplicationAction) => {
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

    default:
      return state
  }
}
