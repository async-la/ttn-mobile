// @flow
import { refreshAccessTokenAsync } from '../scopes/auth/actions'

let singletonStore = null

type APIOptions = {
  body?: Object,
};

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

async function getRequest(endpoint: string) {
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

async function patchRequest(endrpoint: string, options?: APIOptions = {}) {
  const token = await getToken()
  const { body } = options

  try {
    const response = await fetch(endrpoint, {
      method: 'PATCH',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const json = response.status !== 204 && (await response.json())
    return json
  } catch (err) {
    throw err
  }
}

async function postRequest(endpoint: string, options?: APIOptions = {}) {
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

async function putRequest(endpoint: string, options: APIOptions = {}) {
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

    //@NOTE: 204 status fails on calling .json()
    const json = response.status !== 204 && (await response.json())

    return json
  } catch (err) {
    throw err
  }
}

async function deleteRequest(endpoint: string, options?: APIOptions) {
  const token = await getToken()
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    })

    //@NOTE: 204 status fails on calling .json()
    const json = response.status !== 204 && (await response.json())

    return json
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
