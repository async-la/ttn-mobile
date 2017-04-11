// @flow

import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from './types'
import type {
  Notification,
  HideNotificationAction,
  ShowNotificationAction,
} from './types'

export function hideNotification(): HideNotificationAction {
  return { type: HIDE_NOTIFICATION }
}

export function showNotification(
  payload: Notification
): ShowNotificationAction {
  return { type: SHOW_NOTIFICATION, payload: payload }
}
