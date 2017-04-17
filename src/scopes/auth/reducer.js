// @flow

import { RECEIVE_AUTH, RESET_AUTH } from './types'

import type { Action } from '../types'

export type State = {
  accessToken: ?string,
  accessTokenExpiresAt: ?number,
  refreshToken: ?string,
  tokenType: ?string,
};

export const initialState: State = {
  accessToken: null,
  accessTokenExpiresAt: null,
  refreshToken: null,
  tokenType: null,
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case RECEIVE_AUTH:
      return { ...state, ...action.payload }

    case RESET_AUTH:
      return initialState

    default:
      return state
  }
}
