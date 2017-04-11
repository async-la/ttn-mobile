// @flow

import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from './types'
import type { NotificationAction, Notification } from './types'

export type State = Notification;

export const initialState = {
  message: '',
  open: false,
  options: {
    dismissible: true,
    error: false,
    vibrate: true,
  },
}

export default (state: State = initialState, action: NotificationAction) => {
  switch (action.type) {
    case HIDE_NOTIFICATION:
      return { ...initialState }
    case SHOW_NOTIFICATION:
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        open: true,
        options: {
          ...state.options,
          ...action.payload.options,
        },
      }
    default:
      return state
  }
}
