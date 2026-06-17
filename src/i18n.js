import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fa from './locales/fa.json'

const LANGUAGE_KEY = 'noteshare.language'

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY)

  if (savedLanguage === 'fa' || savedLanguage === 'en') {
    return savedLanguage
  }

  const browserLanguage = navigator.language?.toLowerCase() || ''
  return browserLanguage.startsWith('fa') ? 'fa' : 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  localStorage.setItem(LANGUAGE_KEY, language)
  document.documentElement.lang = language
  document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
})

document.documentElement.lang = i18n.language
document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr'

export default i18n
