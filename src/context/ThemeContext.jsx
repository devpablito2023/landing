import { createContext, useContext, useState, useEffect } from "react";

// Definir opciones de tema predeterminadas
const defaultThemeOptions = {
  colorScheme: "indigo", // indigo, orange, green, red, purple
  themeMode: "light", // light, dark, system
  fontFamily: "inter", // inter, roboto, poppins, montserrat, opensans
};

// Crear el contexto
const ThemeContext = createContext();

// Hook personalizado para usar el contexto
export const useTheme = () => useContext(ThemeContext);

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  // Estado para las opciones de tema
  const [themeOptions, setThemeOptions] = useState(() => {
    // Intentar cargar las opciones guardadas en sessionStorage
    try {
      const savedOptions = sessionStorage.getItem("themeOptions");
      return savedOptions ? JSON.parse(savedOptions) : defaultThemeOptions;
    } catch (error) {
      console.error("Error al cargar las opciones de tema:", error);
      return defaultThemeOptions;
    }
  });

  // Detectar preferencia del sistema
  useEffect(() => {
    if (themeOptions.themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Función para manejar cambios en la preferencia del sistema
      const handleChange = (e) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };

      // Aplicar inicialmente
      handleChange(mediaQuery);

      // Escuchar cambios
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [themeOptions.themeMode]);

  // Guardar opciones en sessionStorage cuando cambien
  useEffect(() => {
    try {
      sessionStorage.setItem("themeOptions", JSON.stringify(themeOptions));
      console.log("Tema guardado en sessionStorage:", themeOptions);
    } catch (error) {
      console.error("Error al guardar las opciones de tema:", error);
    }
  }, [themeOptions]);

  // Aplicar clases CSS basadas en las opciones de tema
  useEffect(() => {
    const { colorScheme, themeMode, fontFamily } = themeOptions;

    // Aplicar modo oscuro
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (themeMode === "light") {
      document.documentElement.classList.remove("dark");
    }
    // El modo "system" se maneja en el useEffect anterior

    // Aplicar esquema de color
    document.documentElement.setAttribute("data-color-scheme", colorScheme);

    // Aplicar familia de fuente
    document.documentElement.setAttribute("data-font-family", fontFamily);

    // Aplicar la fuente directamente al elemento raíz
    const fontFamilyMap = {
      inter: '"Inter", sans-serif',
      roboto: '"Roboto", sans-serif',
      poppins: '"Poppins", sans-serif',
      montserrat: '"Montserrat", sans-serif',
      opensans: '"Open Sans", sans-serif',
    };

    document.documentElement.style.fontFamily =
      fontFamilyMap[fontFamily] || fontFamilyMap.inter;

    console.log("Aplicando tema:", themeOptions);
  }, [themeOptions]);

  // Función para actualizar opciones de tema
  const updateTheme = (newOptions) => {
    console.log("Actualizando tema con:", newOptions);
    setThemeOptions((prev) => ({ ...prev, ...newOptions }));
  };

  // Valor del contexto
  const value = {
    themeOptions,
    updateTheme,
    colorSchemes: ["indigo", "orange", "green", "red", "purple"],
    themeModes: ["light", "dark", "system"],
    fontFamilies: ["inter", "roboto", "poppins", "montserrat", "opensans"],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
