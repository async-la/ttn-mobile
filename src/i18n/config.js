// @flow

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import enMessages from '../../build/lang/en.json'

addLocaleData([...enLocaleData])

export const DEFAULT_LOCALE = 'en'

export const translations = {
  en: enMessages,
}
