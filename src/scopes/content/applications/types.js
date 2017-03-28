// @flow

export const RECEIVE_APPLICATION = 'applications/RECEIVE_APPLICATION'

export type ReceiveApplicationAction = {
  type: 'applications/RECEIVE_APPLICATION',
  applications: any, // @TODO deprecate in favor of factory [zack]
};
export type ApplicationsAction = ReceiveApplicationAction;
