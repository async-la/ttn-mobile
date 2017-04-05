// @flow

type KV<C, S> = {
  set: ($Keys<S>, any, $Keys<C>) => void,
  get: ($Keys<S>) => any,
};

export function createKV<C: Object, S: Object>(
  config: C,
  initialState: S
): KV<C, S> {
  return {
    get: (key: string) => {
      return initialState[key]
    },
    set: (key: string, value: any, configKey: string) => {},
  }
}
