// @flow

import apiClient from '../../../utils/apiClient'

import { APPLICATIONS } from '../../../constants/apiEndpoints'
import type {
  AccessKey,
  AccessKeyOptions,
  Collaborator,
  TTNDevice,
  TTNApplication,
} from './types'
import type { Dispatch, GetState } from '../../../types/redux'

/**
 * Fetch ALL Applications
 */

export function getApplicationsAsync() {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: Array<TTNApplication> = await apiClient.get(APPLICATIONS)
      return dispatch({ type: 'content/RECEIVE_TTN_APPLICATIONS', payload })
    } catch (err) {
      console.log('## getApplicationsAsync error', err)
      throw err
    }
  }
}

/**
 * Fetch Application by ID
 */

export function getApplicationAsync(application: TTNApplication) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: TTNApplication = await apiClient.get(APPLICATIONS + id)
      return dispatch({ type: 'content/RECEIVE_TTN_APPLICATION', payload })
    } catch (err) {
      console.log('## getApplicationAsync error', err)
      throw err
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
      throw err
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
      throw err
    }
  }
}

/**
 * Fetch Devices for Application
 */

export function getApplicationDevicesAsync(application: TTNApplication) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    if (!application.handler) {
      console.warn(
        'Attempting to get devices with no handler registered, returning empty array'
      )
      return []
    }
    try {
      const payload: Array<TTNDevice> = await apiClient.get(
        APPLICATIONS + id + '/devices/'
      )
      dispatch({ type: 'content/RECEIVE_TTN_DEVICES', payload })
      return payload
    } catch (err) {
      console.log('## getApplicationDevicesAsync error', err)
      throw err
    }
  }
}

/**
 * Fetch Single Device
 */

export function getDeviceAsync(application: TTNApplication, deviceId: string) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: TTNDevice = await apiClient.get(
        APPLICATIONS + id + '/devices/' + deviceId
      )
      dispatch({ type: 'content/RECEIVE_TTN_DEVICE', payload })
      return payload
    } catch (err) {
      console.log('## getDeviceAsync error', err)
      throw err
    }
  }
}

/**
  * Add Device
  */

export function addDeviceAsync(application: TTNApplication, device: TTNDevice) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: TTNDevice = await apiClient.post(
        APPLICATIONS + id + '/devices',
        {
          body: device,
        }
      )
      dispatch({ type: 'content/RECEIVE_TTN_DEVICE', payload })
      return payload
    } catch (err) {
      console.log('## addDeviceAsync error', err)
      throw err
    }
  }
}

/**
 * Update Device
 */

export function updateDeviceAsync(
  application: TTNApplication,
  deviceId: string,
  device: TTNDevice
) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload: TTNDevice = await apiClient.patch(
        APPLICATIONS + id + '/devices/' + deviceId,
        { body: device }
      )
      dispatch({ type: 'content/RECEIVE_TTN_DEVICE', payload })
      return payload
    } catch (err) {
      console.log('## updateDeviceAsync error', err)
      throw err
    }
  }
}

/**
 * Delete Device
 */

export function deleteDeviceAsync(
  application: TTNApplication,
  device: TTNDevice
) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(
        APPLICATIONS + id + '/devices/' + (device.dev_id || '')
      )
      dispatch(getApplicationDevicesAsync(application))
    } catch (err) {
      console.log('## deleteDeviceAsync error', err)
      throw err
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
      throw err
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
      throw err
    }
  }
}

export function createEUIAsync(application: TTNApplication) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const payload = await apiClient.post(APPLICATIONS + id + '/euis')
      await dispatch(getApplicationAsync(application))
      return payload
    } catch (err) {
      console.log('## createEUIAsync error', err)
      throw err
    }
  }
}

export function deleteEUIAsync(application: TTNApplication, eui: string) {
  const { id } = application
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(APPLICATIONS + id + '/euis/' + eui)
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## deleteEUIAsync error', err)
      throw err
    }
  }
}

export function createAccessKeyAsync(
  application: TTNApplication,
  accessKeyOptions: AccessKeyOptions
) {
  const { id } = application
  const { name, rights } = accessKeyOptions
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.put(APPLICATIONS + id + '/access-keys/' + name, {
        body: { rights },
      })
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## createAccessKeyAsync error', err)
      throw err
    }
  }
}

export function deleteAccessKeyAsync(
  application: TTNApplication,
  accessKey: AccessKey
) {
  const { id } = application
  const { name } = accessKey
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(APPLICATIONS + id + '/access-keys/' + name)
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## deleteAccessKeyAsync error', err)
      throw err
    }
  }
}

export function createCollaboratorAsync(
  application: TTNApplication,
  collaborator: Collaborator
) {
  const { id } = application
  const { username, rights } = collaborator
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.put(APPLICATIONS + id + '/collaborators/' + username, {
        body: { rights },
      })
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## createCollaboratorAsync error', err)
      throw err
    }
  }
}

export function deleteCollaboratorAsync(
  application: TTNApplication,
  collaborator: Collaborator
) {
  const { id } = application
  const { username } = collaborator
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      await apiClient.delete(APPLICATIONS + id + '/collaborators/' + username)
      await dispatch(getApplicationAsync(application))
    } catch (err) {
      console.log('## deleteCollaboratorAsync error', err)
      throw err
    }
  }
}
