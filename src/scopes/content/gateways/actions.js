// @flow

import apiClient from '../../../utils/apiClient'

import { GATEWAYS } from '../../../constants/apiEndpoints'
import type { Gateway } from './types'
import type { Dispatch, GetState } from '../../../types/redux'

/**
 * Fetch ALL Gateways
 */

export function getGatewaysAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload: Array<Gateway> = await apiClient.get(GATEWAYS)
    return dispatch({ type: 'content/RECEIVE_GATEWAYS', payload })
  }
}

/**
 * Fetch Gateway by ID
 */

export function getGatewayAsync(gateway: Gateway) {
  const { id } = gateway
  return async (dispatch: Dispatch, getState: GetState) => {
    const payload: Gateway = await apiClient.get(GATEWAYS + id)
    return dispatch({ type: 'content/RECEIVE_GATEWAY', payload })
  }
}
