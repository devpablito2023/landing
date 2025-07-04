import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importa los archivos de traducción
import translationES from "./locales/es/translation.json";
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationDE from "./locales/de/translation.json";
import translationPT from "./locales/pt/translation.json";

// Recursos de traducción
const resources = {
  es: {
    translation: translationES,
  },
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  de: {
    translation: translationDE,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  // Detecta el idioma del usuario
  .use(LanguageDetector)
  // Pasa el i18n a react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    resources,
    fallbackLng: "es",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // No es necesario para React
    },
    react: {
      useSuspense: false, // Para evitar problemas con SSR
    },
  });

export default i18n;
