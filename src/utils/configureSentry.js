// @flow

import { Sentry } from 'react-native-sentry/lib/Sentry'

export default function() {
  if (!__DEV__) {
    Sentry.config(
      'https://c301d1166c6d4a5ba1984df20f5a2160:e81d375ff884466ca40f58da0134336e@sentry.io/159098'
    ).install()
  }
}
