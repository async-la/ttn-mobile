// @flow

import apiClient from '../../../utils/apiClient'

import { APPLICATIONS } from '../../../constants/apiEndpoints'

export function getApplications() {
  return async (dispatch, getState) => {
    const applications = await apiClient.get(APPLICATIONS)
    console.log('getApplications', applications)
  }
}

export function getApplicationById(applicationId) {
  return async (dispatch, getState) => {
    const applications = await apiClient.get(APPLICATIONS + applicationId)
    dispatch({ type: RECEIVE_APPLICATION, application })
  }
}
