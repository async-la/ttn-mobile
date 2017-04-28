//@flow

export function removePrefix(text: string = '', prefix: string) {
  return text.indexOf(prefix) === 0 ? text.slice(prefix.length) : text
}
