// @flow

let singletonStore = null

export function initializeClient(store) {
  singletonStore = store
}

function getToken() {
  if (!singletonStore) throw new Error('API Client is not initialized')
  return singletonStore.getState().auth.accessToken
  console.log('singletonSTore', singletonStore.getState())
}

export async function get(endpoint, options) {
  const token = getToken()
  console.log('get', endpoint)
  console.log('token', token)

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    })

    console.log('response', response)
    const json = await response.json()
    console.log('json', json)

    return json
  } catch (err) {
    throw err
  }
}

export async function post(endpoint, options) {
  const token = getToken()
  const { body } = options

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const json = await response.json()

    return json
  } catch (err) {
    throw err
  }
}
