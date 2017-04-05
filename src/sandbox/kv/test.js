// @flow

import { createKV } from './lib'

function dispatch() {}

const config = {
  shortSession: { type: 'session', expires: 10000 },
  local: { type: 'local', expires: 20000 },
}

type KVState = {|
  a: number,
  b: string,
|};
const initialState: KVState = {
  a: 1,
  b: 'a',
}

const kv = createKV(config, initialState)

// kv.set({ a: 'b' }, 'locals')
kv.set('a', 'b', 'local')
const s = kv.get('a')
const ss = kv.get('b')

const aa: string = s.a
