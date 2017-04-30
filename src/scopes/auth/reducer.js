// @flow

import { RECEIVE_AUTH, RESET_AUTH, RECEIVE_USER } from './types'

import type { Action } from '../types'
import type { User } from './types'

export type State = {
  accessToken: ?string,
  accessTokenExpiresAt: ?number,
  refreshToken: ?string,
  tokenType: ?string,
  user: ?User,
}

export const initialState: State = {
  accessToken: null,
  accessTokenExpiresAt: null,
  refreshToken: null,
  tokenType: null,
  user: null,
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case RECEIVE_AUTH:
      return { ...state, ...action.payload }

    case RECEIVE_USER:
      return { ...state, user: action.payload }

    case RESET_AUTH:
      return initialState

    default:
      return state
  }
}
