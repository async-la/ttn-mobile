// @flow

import apiClient from '../../../utils/apiClient'

import { RECEIVE_APPLICATION, type ApplicationsAction } from './types'
import { APPLICATIONS } from '../../../constants/apiEndpoints'

import type { Dispatch, GetState } from '../../../types/redux'

export function getApplications() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const applications = await apiClient.get(APPLICATIONS)
    return applications
  }
}

export function getApplicationById(applicationId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const applications = await apiClient.get(APPLICATIONS + applicationId)
    return dispatch({ type: RECEIVE_APPLICATION, applications })
  }
}
