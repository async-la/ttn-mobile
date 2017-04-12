// @flow

import apiClient from '../../../utils/apiClient'

import { APPLICATIONS } from '../../../constants/apiEndpoints'
import { RECEIVE_TTN_APPLICATION, RECEIVE_TTN_APPLICATIONS } from './types'
import type { TTNApplication } from './types'
import type { Dispatch, GetState } from '../../../types/redux'

/**
 * Fetch ALL Applications
 */
export function getApplicationsAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload: Array<TTNApplication> = await apiClient.get(APPLICATIONS)
    return dispatch({ type: RECEIVE_TTN_APPLICATIONS, payload })
  }
}

/**
 * Fetch Application by ID
 */
export function getApplicationAsync(application: TTNApplication) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload: TTNApplication = await apiClient.get(APPLICATIONS + id)
    return dispatch({ type: RECEIVE_TTN_APPLICATION, payload })
  }
}

/**
 * Fetch Devices for Application
 */
export function getApplicationDevicesAsync(application: TTNApplication) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    if (!application.handler) return []
    try {
      const payload: Array<TTNApplication> = await apiClient.get(
        APPLICATIONS + id + '/devices/'
      )
      return payload
    } catch (err) {
      console.log('## getApplicationDevicesAsync error', err)
    }
  }
}

/**
 * Add Application
 */

export function addApplicationAsync(application: TTNApplication) {
  const { handler, id, name } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.post(APPLICATIONS, { body: { id, name } })
      if (handler) await dispatch(updateHandlerAsync(application))
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## addApplicationAsync error', err)
    }
  }
}

/**
 * Update Existing Application
 */

export function updateApplicationAsync(application: TTNApplication) {
  const { handler, id, name } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.patch(APPLICATIONS + id, { body: { description: name } })
      if (handler) await dispatch(updateHandlerAsync(application))
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## updateApplicationAsync error', err)
    }
  }
}

export function updateHandlerAsync(application: TTNApplication) {
  const { handler, id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      if (handler === 'none')
        await apiClient.delete(APPLICATIONS + id + '/registration')
      else
        await apiClient.put(APPLICATIONS + id + '/registration', {
          body: { handler },
        })
    } catch (err) {
      console.log('## updateHandlerAsync error', err)
    }
  }
}

/**
 * Delete Application
 */

export function deleteApplicationAsync(application: TTNApplication) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(APPLICATIONS + id)
      await dispatch(getApplicationsAsync())
    } catch (err) {
      console.log('## deleteApplicationAsync error', err)
    }
  }
}
