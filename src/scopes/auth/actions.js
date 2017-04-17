// @flow

import base64 from 'base-64'
import queryString from 'query-string'

import { ACCESS_TOKEN_URI } from '../../constants/apiEndpoints'
import { RECEIVE_AUTH, RESET_AUTH } from './types'

import type { AuthPayload, ReceiveAuthAction } from './types'
import type { Dispatch, GetState } from '../../types/redux'

export function receiveAuth(payload: AuthPayload): ReceiveAuthAction {
  return { type: RECEIVE_AUTH, payload: payload }
}

export function resetAuth(): resetAuth {
  return { type: RESET_AUTH }
}

export function getAccessTokenAsync(event: { url: string }) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const params = event.url.split('?')[1]
    const query = queryString.parse(params)

    const result = await fetch(ACCESS_TOKEN_URI, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode('async-llc:1f1f78bf32611b4f22a12e2bc040c2afbd161dffa683a0a3d049292425cd99d2')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: 'ttn://oauth',
      }),
    })

    const json = await result.json()
    return dispatch(receiveAuth(formatPayload(json)))
  }
}

export function refreshAccessTokenAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const result = await fetch(ACCESS_TOKEN_URI, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode('async-llc:1f1f78bf32611b4f22a12e2bc040c2afbd161dffa683a0a3d049292425cd99d2')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: getState().auth.refreshToken,
      }),
    })

    const json = await result.json()
    return dispatch(receiveAuth(formatPayload(json)))
  }
}

function formatPayload(payload) {
  return {
    accessToken: payload.access_token,
    accessTokenExpiresAt: Date.now() + payload.expires_in * 1000,
    refreshToken: payload.refresh_token,
    tokenType: payload.token_type,
  }
}
