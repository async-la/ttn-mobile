// @flow
import { Platform, StatusBar } from 'react-native'
import { refreshAccessTokenAsync } from '../scopes/auth/actions'

let singletonStore = null

type APIOptions = {
  body?: Object,
}

export function initializeClient(store: Object) {
  singletonStore = store
}

async function getTokenAsync() {
  if (!singletonStore) throw new Error('API Client is not initialized')
  const auth = singletonStore.getState().auth

  if (auth.accessTokenExpiresAt < Date.now()) {
    await singletonStore.dispatch(refreshAccessTokenAsync())
    return singletonStore.getState().auth.accessToken
  } else {
    return auth.accessToken
  }
}

async function makeRequestAsync(method = 'GET', endpoint, options = {}) {
  Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true)

  const token = await getTokenAsync()
  const { body } = options

  return fetch(endpoint, {
    method: method,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  })
}

async function processResponse(response = {}) {
  Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false)

  if (response.status < 200 || response.status >= 300) {
    throw response
  }

  const contentType = response.headers && response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const json = await response.json()
    return json
  } else {
    return response
  }
}

async function getRequest(endpoint: string): any {
  try {
    const response = await makeRequestAsync('GET', endpoint)
    return processResponse(response)
  } catch (err) {
    throw err
  }
}

async function patchRequest(endpoint: string, options?: APIOptions = {}): any {
  try {
    const response = await makeRequestAsync('PATCH', endpoint, options)
    return processResponse(response)
  } catch (err) {
    throw err
  }
}

async function postRequest(endpoint: string, options?: APIOptions = {}): any {
  try {
    const response = await makeRequestAsync('POST', endpoint, options)
    return processResponse(response)
  } catch (err) {
    throw err
  }
}

async function putRequest(endpoint: string, options?: APIOptions = {}): any {
  try {
    const response = await makeRequestAsync('PUT', endpoint, options)
    return processResponse(response)
  } catch (err) {
    throw err
  }
}

async function deleteRequest(endpoint: string, options?: APIOptions): any {
  try {
    const response = await makeRequestAsync('DELETE', endpoint, options)
    return processResponse(response)
  } catch (err) {
    throw err
  }
}

export default {
  get: getRequest,
  patch: patchRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
}
