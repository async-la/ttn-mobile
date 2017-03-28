// @flow

import { REHYDRATE } from 'redux-persist/constants'

export const initialState = {
  bootstrapped: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, ...action.payload.app, bootstrapped: true }

    default:
      return state
  }
}
