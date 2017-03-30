// @flow

import { createSetter } from './lib'

function dispatch() {}

const config = {
  shortSession: { type: 'session', expires: 10000 },
  local: { type: 'local', expires: 20000 },
}

dispatch.set = createSetter(config)

dispatch.set({ a: 'b' }, 'shortSession')
