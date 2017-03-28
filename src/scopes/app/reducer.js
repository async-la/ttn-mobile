// @flow

import { REHYDRATE } from '../types'

import type { Action } from '../types'

export type State = {
  bootstrapped: boolean,
};

export const initialState: State = {
  bootstrapped: false,
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case REHYDRATE:
      action
      return { ...state, ...action.payload.app, bootstrapped: true }

    default:
      return state
  }
}
