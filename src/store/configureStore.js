// @flow

declare var ErrorUtils: any

import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import logger from 'redux-logger'
import rootReducer from '../scopes/rootReducer'
import stateManager from 'redux-persist-state-manager'
import thunk from 'redux-thunk'

const VERSION = 1

//@TODO exclude logging on provide
const middleware = [thunk, logger]

const enhancers = applyMiddleware(...middleware)
const stateManagedReducer = stateManager(rootReducer, { version: VERSION }, {})

export default () => {
  const store = createStore(stateManagedReducer, undefined, enhancers)
  const persistor = persistStore(store, { storage: AsyncStorage })
  //.purge()

  if (process.env.NODE_ENV === 'production') {
    let originalGlobalErrorHandler = ErrorUtils.getGlobalHandler()
    ErrorUtils.setGlobalHandler(async error => {
      await persistor.purge()
      ErrorUtils.setGlobalHandler(originalGlobalErrorHandler)
      throw error
    })
  }

  return { store, persistor }
}
