// @flow

import { applyReduce } from 'redux-reduce/src'

import rootReducer from '../scopes/rootReducer'
import orchestrator from '../scopes/orchestrator'

export default function(persist: Function) {
  return applyReduce(orchestrator, persist)(rootReducer)
}
