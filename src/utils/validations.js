//@flow

export function validateApplicationDescription(
  applicationDescription: ?string
) {
  const isInvalid = !applicationDescription || applicationDescription.length < 1
  const validationMsg = 'Description cannot be empty'
  return {
    isInvalid,
    validationMsg,
  }
}

export function validateDeviceId(deviceId: ?string) {
  const regex = /^[a-z0-9]+([-_][a-z0-9]+)*$/
  const isInvalid = !deviceId || deviceId.length < 2 || !regex.test(deviceId)
  const validationMsg =
    'Name must consist of lowercase alphanumeric characters, nonconsecutive - and _ and cannot start or end with - or _'
  return {
    isInvalid,
    validationMsg,
  }
}

export function validateEmailAddress(emailAddress: ?string) {
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  const isInvalid = !emailAddress || !regex.test(emailAddress)
  const validationMsg = 'Please enter a valid email address'
  return {
    isInvalid,
    validationMsg,
  }
}

export function validateNotEmpty(value: ?string) {
  const isInvalid = !value || !value.length
  const validationMsg = 'Field cannot be empty'
  return {
    isInvalid,
    validationMsg,
  }
}

export function getValidResponse() {
  return {
    isInvalid: false,
    validationMsg: '',
  }
}
