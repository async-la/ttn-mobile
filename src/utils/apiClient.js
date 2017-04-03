// @flow
import { refreshAccessTokenAsync } from '../scopes/auth/actions'

let singletonStore = null

export function initializeClient(store: Object) {
  singletonStore = store
}

async function getToken() {
  if (!singletonStore) throw new Error('API Client is not initialized')
  const auth = singletonStore.getState().auth

  if (auth.accessTokenExpiresAt < Date.now()) {
    await singletonStore.dispatch(refreshAccessTokenAsync())
    return singletonStore.getState().auth.accessToken
  } else {
    return auth.accessToken
  }
}

async function getRequest(endpoint: String, options?: Object) {
  const token = await getToken()
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()
    return json
  } catch (err) {
    throw err
  }
}

async function postRequest(endpoint: String, options?: Object) {
  const token = await getToken()
  const { body } = options

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const json = await response.json()

    return json
  } catch (err) {
    throw err
  }
}

async function putRequest(endpoint: String, options?: Object) {
  const token = await getToken()
  const { body } = options

  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const json = await response.json()

    return json
  } catch (err) {
    throw err
  }
}

async function deleteRequest(endpoint: String, options?: Object) {
  const token = await getToken()

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    return json
  } catch (err) {
    throw err
  }
}

export default {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
}
