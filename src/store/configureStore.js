// @flow

import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import logger from 'redux-logger'
import rootReducer from '../scopes/rootReducer'
import stateManager from 'redux-persist-state-manager'
import thunk from 'redux-thunk'

const VERSION = 1

//@TODO exclude logging on provide
const middleware = [logger, thunk]

const enhancers = applyMiddleware(...middleware)
const stateManagedReducer = stateManager(rootReducer, { version: VERSION }, {})

export default () => {
  const store = createStore(stateManagedReducer, undefined, enhancers)
  const persistor = persistStore(store, { storage: AsyncStorage })
  //.purge()

  return { store, persistor }
}
