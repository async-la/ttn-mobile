// @flow

export type Notification = {
  data?: {
    uri: string,
  },
  message: string,
  open: boolean,
  options: {
    error?: boolean,
    dismissible?: boolean,
    vibrate?: boolean,
    fromBottom?: boolean,
  },
};

export const SHOW_NOTIFICATION = 'notification/SHOW'
export type ShowNotificationAction = {
  type: 'notification/SHOW',
  payload: Notification,
};

export const HIDE_NOTIFICATION = 'notification/HIDE'
export type HideNotificationAction = {
  type: 'notification/HIDE',
};

export type NotificationAction =
  | ShowNotificationAction
  | HideNotificationAction;
