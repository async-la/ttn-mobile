// @flow
import config from '../config.env'

/* @NOTE:
* URI used to make an authorization request. Requires a valid client ID issued by TTN.
* The value for `redirect_uri` is specific to this apps deep link URI.
* See: https://www.thethingsnetwork.org/docs/network/account/authentication.html#1-make-an-authorization-request
*/
export const AUTHORIZATION_URI = `https://account.thethingsnetwork.org/users/authorize?client_id=${config.TTN_CLIENT_ID}&redirect_uri=ttn://oauth&response_type=code`

/* @NOTE:
* Combination of your TTN issued client id and secret. Required to get and refresh the users access token.
* See: https://www.thethingsnetwork.org/docs/network/account/authentication.html#exchanging-an-access-key-for-an-access-token
*/
export const ACCESS_TOKEN = `${config.TTN_CLIENT_ID}:${config.TTN_CLIENT_SECRET}`

export const ACCESS_TOKEN_URI =
  'https://account.thethingsnetwork.org/users/token'
export const APPLICATIONS =
  'https://console.thethingsnetwork.org/api/applications/'
export const GATEWAYS = 'https://console.thethingsnetwork.org/api/gateways/'
