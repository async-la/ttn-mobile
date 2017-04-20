// @flow

import { REHYDRATE as SOURCE_REHYDRATE } from 'redux-p/src/constants'

import type { AuthAction } from './auth/types'
import type { TTNApplicationAction } from './content/applications/types'

import type { State as AuthState } from './auth/reducer'
import type { State as ContentState } from './content/reducer'
import type { State as NavigatorState } from './navigation/reducer'

const REHYDRATE = 'persist/REHYDRATE' // we need to duplicate here for typing reasons, correctness ensured on next line
if (SOURCE_REHYDRATE !== REHYDRATE)
  throw new Error('Rehydrate constant mismatch')

export { REHYDRATE }

export type State = {
  auth: AuthState,
  content: ContentState,
  navigator: NavigatorState,
};

type RehydrateAction = {
  type: 'persist/REHYDRATE',
  payload: State,
};

export type Action = TTNApplicationAction | AuthAction | RehydrateAction;
