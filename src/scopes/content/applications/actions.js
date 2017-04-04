// @flow

import apiClient from '../../../utils/apiClient'

import { APPLICATIONS } from '../../../constants/apiEndpoints'
import { RECEIVE_TTN_APPLICATION, RECEIVE_TTN_APPLICATIONS } from './types'
import type { Dispatch, GetState } from '../../../types/redux'

export function getApplicationsAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload = await apiClient.get(APPLICATIONS)
    return dispatch({ type: RECEIVE_TTN_APPLICATIONS, payload })
  }
}

export function getApplicationByIdAsync(applicationId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload = await apiClient.get(APPLICATIONS + applicationId)
    return dispatch({ type: RECEIVE_TTN_APPLICATION, payload })
  }
}
