// @flow

import React from 'react'
import { Text } from 'react-native'
import { IntlProvider } from 'react-intl'
import { DEFAULT_LOCALE } from './'

type Props = {
  messages: { [key: string]: string },
  children?: React.Element<any>,
  translations: Object, // @TODO better intl typing
}

// @TODO: figure out locale or set it somewhere [cc]

export function LanguageProvider(props: Props): React.Element<any> {
  return (
    <IntlProvider
      locale={DEFAULT_LOCALE}
      messages={props.translations[DEFAULT_LOCALE]}
      textComponent={Text}
    >
      {props.children}
    </IntlProvider>
  )
}
