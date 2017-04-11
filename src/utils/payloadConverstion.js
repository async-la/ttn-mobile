// @flow
import base64 from 'base-64'

export function base64toHEX(string: string, split: boolean = false) {
  let raw = base64.decode(string)
  let HEX = ''
  for (let i = 0; i < raw.length; i++) {
    let _hex = raw.charCodeAt(i).toString(16)
    HEX += _hex.length == 2 ? _hex : '0' + _hex
  }
  return split
    ? HEX.toUpperCase().replace(/(.{2})/g, '$1 ').trim()
    : HEX.toUpperCase()
}
