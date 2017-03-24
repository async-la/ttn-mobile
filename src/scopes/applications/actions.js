// @flow

import * as apiClient from '../../utils/apiClient'

import { APPLICATIONS } from '../../constants/apiEndpoints'

export function getApplications() {
  return async (dispatch, getState) => {
    const applications = await apiClient.get(APPLICATIONS)
    console.log('getApplications', applications)

    dispatch ({type: RECEIVE_APPLICATIONS, applications })
  }
}

export function getApplicationById(applicationId) {
  return async (dispatch, getState) => {
    const applications = await apiClient.get(APPLICATIONS + applicationId)
    dispatch ({type: RECEIVE_APPLICATION, application })
  }
}
