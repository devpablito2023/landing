import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeOptions, updateTheme } = useTheme();
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  const { t } = useTranslation();

  // Colores disponibles
  const colors = [
    { name: "indigo", class: "bg-indigo-600", label: "Indigo" },
    { name: "orange", class: "bg-orange-600", label: "Orange" },
    { name: "green", class: "bg-green-600", label: "Green" },
    { name: "red", class: "bg-red-600", label: "Red" },
    { name: "purple", class: "bg-purple-600", label: "Purple" },
  ];

  /// Actualiza la lista de fuentes disponibles
  const fonts = ["inter", "roboto", "poppins", "montserrat", "open-sans"];

  // Actualiza las etiquetas de las fuentes
  const fontLabels = {
    inter: "Inter",
    roboto: "Roboto",
    poppins: "Poppins",
    montserrat: "Montserrat",
    "open-sans": "Open Sans",
  };

  // Nombres de idiomas
  const languageNames = {
    es: t("languages.es"),
    en: t("languages.en"),
    fr: t("languages.fr"),
    de: t("languages.de"),
    pt: t("languages.pt"),
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: (custom) => ({
      opacity: 0,
      y: 20,
      transition: {
        delay: custom * 0.1,
      },
    }),
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div>
      {/* Botón para abrir el personalizador */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed right-8 bottom-15 z-40 rounded-full p-3 bg-${themeOptions.colorScheme}-600 text-white shadow-lg hover:bg-${themeOptions.colorScheme}-700 transition-colors duration-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Personalizar tema"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </motion.button>
      {/* Modal del personalizador */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className={`text-2xl font-bold text-${themeOptions.colorScheme}-600 dark:text-${themeOptions.colorScheme}-400`}
                  >
                    {t("theme.customizer")}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                    aria-label="Cerrar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Selector de modo */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg"
                    variants={itemVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center mb-3">
                      <span
                        className={`text-${themeOptions.colorScheme}-600 dark:text-${themeOptions.colorScheme}-400 mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t("theme.mode")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t("theme.modeDescription")}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {["light", "dark", "system"].map((theme) => (
                        <motion.button
                          key={theme}
                          onClick={() => updateTheme({ themeMode: theme })}
                          className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex flex-col items-center ${
                            themeOptions.themeMode === theme
                              ? `bg-${themeOptions.colorScheme}-100 text-${themeOptions.colorScheme}-700 dark:bg-${themeOptions.colorScheme}-900 dark:text-${themeOptions.colorScheme}-100 ring-2 ring-${themeOptions.colorScheme}-500`
                              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mb-1">
                            {theme === "light" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {theme === "dark" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                              </svg>
                            )}
                            {theme === "system" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                          {t(`theme.${theme}`)}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                  {/* Selector de idioma */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg"
                    variants={itemVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center mb-3">
                      <span
                        className={`text-${themeOptions.colorScheme}-600 dark:text-${themeOptions.colorScheme}-400 mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t("theme.language")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t("theme.languageDescription")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {supportedLanguages.map((lang) => (
                        <motion.button
                          key={lang}
                          onClick={() => changeLanguage(lang)}
                          className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                            language === lang
                              ? `bg-${themeOptions.colorScheme}-100 text-${themeOptions.colorScheme}-700 dark:bg-${themeOptions.colorScheme}-900 dark:text-${themeOptions.colorScheme}-100 ring-2 ring-${themeOptions.colorScheme}-500`
                              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {languageNames[lang]}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                  {/* Selector de color */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg"
                    variants={itemVariants}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center mb-3">
                      <span
                        className={`text-${themeOptions.colorScheme}-600 dark:text-${themeOptions.colorScheme}-400 mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t("theme.color")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t("theme.colorDescription")}
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                      {colors.map((color) => (
                        <motion.button
                          key={color.name}
                          onClick={() =>
                            updateTheme({ colorScheme: color.name })
                          }
                          className={`h-12 rounded-lg ${
                            color.class
                          } transition-all duration-200 flex items-center justify-center ${
                            themeOptions.colorScheme === color.name
                              ? "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-gray-400 dark:ring-gray-500 scale-110"
                              : ""
                          }`}
                          aria-label={color.label}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {themeOptions.colorScheme === color.name && (
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                  {/* Selector de fuente */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg"
                    variants={itemVariants}
                    custom={4}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center mb-3">
                      <span
                        className={`text-${themeOptions.colorScheme}-600 dark:text-${themeOptions.colorScheme}-400 mr-2`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t("theme.font")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t("theme.fontDescription")}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {fonts.map((font) => (
                        <motion.button
                          key={font}
                          onClick={() => updateTheme({ fontFamily: font })}
                          className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 font-${font} ${
                            themeOptions.fontFamily === font
                              ? `bg-${themeOptions.colorScheme}-100 text-${themeOptions.colorScheme}-700 dark:bg-${themeOptions.colorScheme}-900 dark:text-${themeOptions.colorScheme}-100 ring-2 ring-${themeOptions.colorScheme}-500`
                              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {fontLabels[font]}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            {/* Overlay para cerrar al hacer clic fuera */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
              style={{ zIndex: -1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeCustomizer;
