import i18n from 'i18n-js'
import * as Localization from 'expo-localization'
import en from './en/main.json'

i18n.translations = {
  en
}

i18n.defaultLocale = 'en'
i18n.locale = Localization.locale

i18n.fallbacks = true

export default i18n
