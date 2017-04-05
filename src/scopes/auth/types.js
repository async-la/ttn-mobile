// @flow

export type AuthPayload = {
  accessToken: string,
  accessTokenExpiresAt: number,
  refreshToken: string,
  tokenType: string,
};

export const RECEIVE_AUTH = 'auth/RECEIVE_AUTH'
export type ReceiveAuthAction = {
  type: 'auth/RECEIVE_AUTH',
  payload: AuthPayload,
};

export const RESET_AUTH = 'auth/RESET_AUTH'
export type ResetAuthAction = {
  type: 'auth/RESET_AUTH',
};

export type AuthAction = ReceiveAuthAction | ResetAuthAction;
