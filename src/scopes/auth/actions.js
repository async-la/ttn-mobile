// @flow

import apiClient from '../../utils/apiClient'
import base64 from 'base-64'
import queryString from 'query-string'

import { ACCESS_TOKEN, ACCESS_TOKEN_URI } from '../../constants/api'
import { RECEIVE_AUTH, RESET_AUTH } from './types'

import type {
  AuthPayload,
  ReceiveAuthAction,
  ResetAuthAction,
  User,
} from './types'
import type { Dispatch, GetState } from '../../types/redux'

export function receiveAuth(payload: AuthPayload): ReceiveAuthAction {
  return { type: RECEIVE_AUTH, payload: payload }
}

export function resetAuth(): ResetAuthAction {
  return { type: RESET_AUTH }
}

export function getUserAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload = await apiClient.get(
        'https://account.thethingsnetwork.org/api/v2/users/me'
      )
      const avatarURI = `https://account.thethingsnetwork.org/api/v2/users/${payload.username}/picture.jpg`
      return dispatch({
        type: 'auth/RECEIVE_USER',
        payload: { ...payload, avatarURI },
      })
    } catch (err) {
      console.log('## getUserAsync error', err)
      throw err
    }
  }
}

export function updateUserAsync(payload: User) {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.patch(
        'https://account.thethingsnetwork.org/api/v2/users/me',
        { body: payload }
      )
      return dispatch(getUserAsync())
    } catch (err) {
      console.log('## updateUserAsync error', err)
      throw err
    }
  }
}

export function uploadUserAvatar(image: string) {
  return async (dispatch: Function, getState: Function) => {
    try {
      await new Promise((resolve, reject) => {
        let payload: Object = new FormData()
        payload.append('picture', {
          uri: image,
          type: 'image/png',
          name: 'picture.png',
        })
        let xhr: XMLHttpRequest = new XMLHttpRequest()
        xhr.open(
          'PUT',
          `https://account.thethingsnetwork.org/api/v2/users/me/picture.jpg`
        )
        xhr.onreadystatechange = () => {
          if (xhr.readyState == xhr.DONE) {
            try {
              let resp = xhr.responseText
              let data = JSON.parse(resp)
              dispatch(getUserAsync())
              resolve(data)
            } catch (err) {
              reject(err)
            }
          }
        }
        xhr.setRequestHeader(
          'Authorization',
          `Bearer ${getState().auth.accessToken}`
        )
        xhr.send(payload)
      })
    } catch (err) {
      throw err
    }
  }
}

export function deleteUserAvatarAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(
        'https://account.thethingsnetwork.org/api/v2/users/me/picture.jpg'
      )
      return dispatch(getUserAsync())
    } catch (err) {
      console.log('## updateUserAsync error', err)
      throw err
    }
  }
}

export function getAccessTokenAsync(event: { url: string }) {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const params = event.url.split('?')[1]
      const query = queryString.parse(params)

      const result = await fetch(ACCESS_TOKEN_URI, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${base64.encode(ACCESS_TOKEN)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: query.code,
          redirect_uri: 'ttn://oauth',
        }),
      })

      const json = await result.json()
      dispatch(receiveAuth(formatPayload(json)))
      return await dispatch(getUserAsync())
    } catch (err) {
      console.log('## getAccessTokenAsync error', err)
      throw err
    }
  }
}

export function refreshAccessTokenAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const result = await fetch(ACCESS_TOKEN_URI, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${base64.encode(ACCESS_TOKEN)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: getState().auth.refreshToken,
        }),
      })

      const json = await result.json()

      await dispatch(receiveAuth(formatPayload(json)))
      return await dispatch(getUserAsync())
    } catch (err) {
      console.log('## refreshAccessTokenAsync error', err)
      throw err
    }
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
