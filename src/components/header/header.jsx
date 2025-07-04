import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";

const Header = () => {
  const { themeOptions, updateTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar el tema actual (light/dark/system)
  useEffect(() => {
    const detectTheme = () => {
      if (themeOptions.themeMode === "light") {
        setIsDarkMode(false);
      } else if (themeOptions.themeMode === "dark") {
        setIsDarkMode(true);
      } else if (themeOptions.themeMode === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(systemPrefersDark);
      }
    };

    detectTheme();

    if (themeOptions.themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeOptions.themeMode]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Función para hacer scroll suave a las secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  // Función para alternar tema
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    updateTheme({ themeMode: newTheme });
  };

  // Función para obtener las clases dinámicas según el tema
  const getThemeClasses = () => {
    if (isDarkMode) {
      return {
        headerBg: `bg-gray-900/95`,
        border: `border-blue-500/30`,
        navLink: `text-blue-400 hover:text-blue-300`,
        menuButton: `text-blue-400 hover:text-blue-300 hover:bg-blue-900/50`,
        underline: `from-blue-400 to-blue-500`,
        mobileHover: `hover:bg-blue-900/30`,
        themeButton: `text-blue-400 hover:text-blue-300 hover:bg-blue-900/50`,
      };
    } else {
      return {
        headerBg: "bg-white/95",
        border: `border-blue-300`,
        navLink: `text-blue-700 hover:text-blue-800`,
        menuButton: `text-blue-700 hover:text-blue-800 hover:bg-blue-100`,
        underline: `from-blue-600 to-blue-700`,
        mobileHover: `hover:bg-blue-100`,
        themeButton: `text-blue-700 hover:text-blue-800 hover:bg-blue-100`,
      };
    }
  };

  const currentClasses = getThemeClasses();

  // Enlaces de navegación actualizados según las secciones existentes
  const navigationItems = [
    { name: "Inicio", id: "inicio" },
    { name: "¿Qué es ZTRACK?", id: "about" },
    { name: "Funciones", id: "features" },
    { name: "FAQ", id: "faq" },
    { name: "Contacto", id: "contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${currentClasses.headerBg} backdrop-blur-md shadow-lg border-b ${currentClasses.border} transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollToSection("hero")}
          >
            <img
              src={logo}
              alt="ZGROUP Logo"
              className="h-10 w-auto object-contain"
            />
          </motion.div>

          {/* Navegación Desktop */}
          <motion.nav
            className="hidden lg:flex items-center space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${currentClasses.navLink} font-medium transition-all duration-300 hover:scale-105 relative group px-3 py-2`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentClasses.underline} transition-all duration-300 group-hover:w-full`}
                ></span>
              </motion.button>
            ))}
          </motion.nav>

          {/* Botones de acción */}
          <div className="flex items-center space-x-3">
            {/* Botón de cambio de tema */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${currentClasses.themeButton} focus:outline-none transition-all duration-200`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              title={
                isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
              }
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </motion.button>

            {/* Botón de menú móvil */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${currentClasses.menuButton} focus:outline-none transition-colors duration-200`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <motion.div
            className={`lg:hidden mobile-menu ${currentClasses.headerBg} border-t ${currentClasses.border} py-4`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${currentClasses.navLink} font-medium text-left py-3 px-4 rounded-lg ${currentClasses.mobileHover} transition-all duration-200`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
