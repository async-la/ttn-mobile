// @flow

import apiClient from '../../../utils/apiClient'

import { GATEWAYS } from '../../../constants/apiEndpoints'
import type { TTNGateway } from './types'
import type { Dispatch, GetState } from '../../../types/redux'

/**
 * Fetch ALL Gateways
 */

export function getGatewaysAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: Array<TTNGateway> = await apiClient.get(GATEWAYS)
      return dispatch({ type: 'content/RECEIVE_TTN_GATEWAYS', payload })
    } catch (err) {
      console.log('## getGatewaysAsync error', err)
      throw err
    }
  }
}

/**
 * Fetch Gateway by ID
 */

export function getGatewayAsync(gateway: TTNGateway) {
  const { id } = gateway
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: TTNGateway = await apiClient.get(GATEWAYS + id)
      return dispatch({ type: 'content/RECEIVE_TTN_GATEWAY', payload })
    } catch (err) {
      console.log('## getGatewaysAsync error', err)
      throw err
    }
  }
}

/**
 * Add Gateway
 */

export function addGatewayAsync(gateway: TTNGateway) {
  return async (
    dispatch: Dispatch,
    getState: GetState
  ): Promise<TTNGateway> => {
    try {
      return await apiClient.post(GATEWAYS, { body: gateway })
    } catch (err) {
      console.log('## addGatewayAsync error', err)
      throw err
    }
  }
}

/**
 * Update Existing Gateway
 */

export function updateGatewayAsync(gateway: TTNGateway) {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.patch(GATEWAYS + gateway.id, { body: gateway })
    } catch (err) {
      console.log('## updateGatewayAsync error', err)
      throw err
    }
  }
}

/**
 * Delete Gateway
 */

export function deleteGatewayAsync(gateway: TTNGateway) {
  const { id } = gateway
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(GATEWAYS + id)
    } catch (err) {
      console.log('## deleteGatewayAsync error', err)
      throw err
    }
  }
}
