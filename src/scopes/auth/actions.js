// @flow

import { RECEIVE_AUTH } from './constants'

type AuthPayload = {
  accessToken: string,
  accessTokenExpiresAt: number,
  refreshToken: string,
  tokenType: string,
};

export function receiveAuth(payload: AuthPayload) {
  return { type: RECEIVE_AUTH, payload: payload }
}
