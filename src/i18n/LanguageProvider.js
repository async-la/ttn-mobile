// @flow

import React from 'react'
import { IntlProvider } from 'react-intl'

type Props = {
  messages: { [key: string]: string },
  children: React.Element<any>,
};

export function LanguageProvider(props: Props): React.Element<any> {
  return (
    <IntlProvider locale={'en-US'} messages={props.messages['en-US']}>
      {props.children}
    </IntlProvider>
  )
}
