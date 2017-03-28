// @flow

import React from 'react'
import { Text } from 'react-native'
import { IntlProvider } from 'react-intl'

type Props = {
  messages: { [key: string]: string },
  children: React.Element<any>,
};

export function LanguageProvider(props: Props): React.Element<any> {
  return (
    <IntlProvider
      locale={'en'}
      messages={props.messages['en']}
      textComponent={Text}
    >
      {props.children}
    </IntlProvider>
  )
}
