// @flow

import { RECEIVE_AUTH } from './types'

import type { AuthPayload, ReceiveAuthAction } from './types'

export function receiveAuth(payload: AuthPayload): ReceiveAuthAction {
  return { type: RECEIVE_AUTH, payload: payload }
}
