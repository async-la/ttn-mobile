// @flow

import { applyReduce, createOrchestrator } from 'redux-reduce/src'
import { createKV, type KV } from 'redux-reduce/src/reducers/kv'

import rootReducer from '../scopes/rootReducer'

const orchestrator = createOrchestrator({ persistors: [] })
const kv = createKV(orchestrator)

// get maintains flow type of init value
let [setTest, getTest]: KV<number> = kv({
  key: 'getTest',
  init: 1,
})
export { setTest, getTest }

export default function(persist: Function) {
  return applyReduce(orchestrator, persist)(rootReducer)
}
