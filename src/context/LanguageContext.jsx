import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

// Crear el contexto
const LanguageContext = createContext();

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe ser usado dentro de un LanguageProvider");
  }
  return context;
};

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // Idiomas soportados
  const supportedLanguages = ["es", "en", "fr", "de", "pt"];

  // Obtener el idioma actual
  const language = i18n.language;

  // Función para cambiar el idioma
  const changeLanguage = (newLanguage) => {
    if (supportedLanguages.includes(newLanguage)) {
      i18n.changeLanguage(newLanguage);
      // i18next ya maneja el almacenamiento en localStorage
      // y actualiza el atributo lang del documento HTML
    }
  };

  // Valor del contexto
  const value = {
    language,
    changeLanguage,
    supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
