// @flow

import apiClient from '../../../utils/apiClient'

import { APPLICATIONS } from '../../../constants/apiEndpoints'

import type { Dispatch, GetState } from '../../../types/redux'

export function getApplications() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const applications = await apiClient.get(APPLICATIONS)
    console.log('getApplications', applications)
  }
}

export function getApplicationById(applicationId) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const applications = await apiClient.get(APPLICATIONS + applicationId)
    dispatch({ type: RECEIVE_APPLICATION, application })
  }
}
