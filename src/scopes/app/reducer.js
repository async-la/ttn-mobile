// @flow

import { REHYDRATE } from 'redux-persist/constants'

export type State = {
  bootstrapped: boolean,
};

export const initialState: State = {
  bootstrapped: false,
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, ...action.payload.app, bootstrapped: true }

    default:
      return state
  }
}
