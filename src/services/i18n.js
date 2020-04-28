import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from './utils'

var lang = localStorage.getItem("lang");
if(lang == null) {
  lang = navigator.language || navigator.userLanguage; 
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getLanguage(),
    backend: {
      /* translation file path */
      loadPath: '/assets/i18n/{{lng}}.json'
    },
    fallbackLng: 'pt-BR',
    debug: false,
    load: 'currentOnly',
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  })

export default i18n