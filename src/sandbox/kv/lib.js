// @flow

export function createSetter(config: *) {
  return (partial: Object, key: $Keys<typeof config>) => {
    return {
      type: 'SET',
      payload: partial,
      key,
    }
  }
}
