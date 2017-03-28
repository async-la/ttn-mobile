// @flow

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'

addLocaleData([...enLocaleData])

import enMessages from '../../build/lang/en.json'

export const translations = {
  en: enMessages,
}
