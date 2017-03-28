// @flow

import React from 'react'
import { Text } from 'react-native'
import { IntlProvider } from 'react-intl'

type Props = {
  messages: { [key: string]: string },
  children: React.Element<any>,
};

// @TODO: figure out locale or set it somewhere [cc]
export function LanguageProvider(props: Props): React.Element<any> {
  return (
    <IntlProvider
      locale={'en'}
      messages={props.translations['en']}
      textComponent={Text}
    >
      {props.children}
    </IntlProvider>
  )
}
