// @flow

export type AuthPayload = {
  accessToken: string,
  accessTokenExpiresAt: number,
  refreshToken: string,
  tokenType: string,
}

export type User = {
  username: string,
  avatarURI?: string,
  email: string,
  name?: { first: string, last: string },
  created?: string,
  valid?: boolean,
  canBeInvitedToSlack?: boolean,
}

export const RECEIVE_AUTH = 'auth/RECEIVE_AUTH'
export type ReceiveAuthAction = {
  type: 'auth/RECEIVE_AUTH',
  payload: AuthPayload,
}

export const RESET_AUTH = 'auth/RESET_AUTH'
export type ResetAuthAction = {
  type: 'auth/RESET_AUTH',
}

export const RECEIVE_USER = 'auth/RECEIVE_USER'
export type ReceiveUserAction = {
  type: 'auth/RECEIVE_USER',
  payload: User,
}

export type AuthAction = ReceiveAuthAction | ResetAuthAction | ReceiveUserAction
