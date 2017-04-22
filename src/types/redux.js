// @flow

import type { State } from '../scopes/rootReducer'
import type { Action } from '../scopes/types'

export type GetState = () => State
type Thunk = (
  Function,
  GetState
) => Action | Promise<Action> | void | Promise<void>
export type Dispatch = (Action | Thunk) => Action | Promise<Action>
