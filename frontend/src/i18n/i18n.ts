// src/i18n/i18n.ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
// import type {TranslationTypes} from "./translations/TranslationTypes";
import en from "./translations/en_translation.json";
import ru from "./translations/ru_translation.json";

const resources = {
    en: {translation: en},
    ru: {translation: ru},
} as const;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "i18nextLng",
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
