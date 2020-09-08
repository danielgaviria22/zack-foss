import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import { en } from './i18n/index.js';

i18n
.use(initReactI18next)
.init({
    resources: {
        en,
    },
    lng: "en",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;