// @flow
import { AsyncStorage } from 'react-native'
import { createOrchestrator } from 'redux-reduce/src'
import { createKV } from 'redux-reduce/src/reducers/kv'

const orchestrator = createOrchestrator({
  persistors: [{ key: 'default', storage: AsyncStorage, version: 1 }],
})

export const kv = createKV(orchestrator)
export default orchestrator
