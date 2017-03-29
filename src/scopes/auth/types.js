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

export type AuthAction = ReceiveAuthAction;
