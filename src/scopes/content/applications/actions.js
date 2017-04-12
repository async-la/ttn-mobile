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
export function getApplicationByIdAsync(applicationId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload: TTNApplication = await apiClient.get(
      APPLICATIONS + applicationId
    )
    return dispatch({ type: RECEIVE_TTN_APPLICATION, payload })
  }
}

/**
 * Fetch Devices for Application
 */
export function getApplicationDevicesAsync(applicationId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload: Array<TTNApplication> = await apiClient.get(
      APPLICATIONS + applicationId + '/devices/'
    )
    return payload
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
      await apiClient.put(APPLICATIONS + id + '/registration', {
        body: { handler },
      })
      await dispatch(getApplicationByIdAsync(id))
    } catch (err) {
      console.log('# Add application async error', err)
    }
  }
}
