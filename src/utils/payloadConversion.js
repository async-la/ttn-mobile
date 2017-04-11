// @flow
import base64 from 'base-64'

export function base64toHEX(string: string, split: boolean = false) {
  let raw = base64.decode(string)
  let HEX = ''
  for (let i = 0; i < raw.length; i++) {
    let _hex = raw.charCodeAt(i).toString(16)
    HEX += _hex.length == 2 ? _hex : '0' + _hex
  }
  return split ? splitHex(HEX.toUpperCase()) : HEX.toUpperCase()
}

export function splitHex(string: string) {
  return string && string.replace(/(.{2})/g, '$1 ').trim()
}

export function hexToMsb(string: string) {
  return string &&
    `{ ${string.replace(/(.{2})/g, '0x$1 ').trim().split(' ').join(', ')} } `
}

export function hexToLsb(string: string) {
  return string &&
    `{ ${string
      .replace(/(.{2})/g, '0x$1 ')
      .trim()
      .split(' ')
      .reverse()
      .join(', ')} } `
}
