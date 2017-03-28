// @flow

import { RECEIVE_AUTH } from './constants'

export type State = {
  accessToken: string,
  accessTokenExpiresAt: number,
  refreshToken: string,
  tokenType: string,
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

    default:
      return state
  }
}
