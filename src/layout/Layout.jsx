import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/header/header";
import PromoBanner from "../components/landing/PromoBanner";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const { themeOptions } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Obtener clases de color basadas en el esquema
  const getColorClasses = (scheme) => {
    const colorMap = {
      indigo: {
        bg: "bg-indigo-600",
        text: "text-indigo-600",
        hover: "hover:bg-indigo-700",
        border: "border-indigo-600",
        gradient: "from-indigo-500 to-indigo-700",
      },
      orange: {
        bg: "bg-orange-600",
        text: "text-orange-600",
        hover: "hover:bg-orange-700",
        border: "border-orange-600",
        gradient: "from-orange-500 to-orange-700",
      },
      green: {
        bg: "bg-green-600",
        text: "text-green-600",
        hover: "hover:bg-green-700",
        border: "border-green-600",
        gradient: "from-green-500 to-green-700",
      },
      red: {
        bg: "bg-red-600",
        text: "text-red-600",
        hover: "hover:bg-red-700",
        border: "border-red-600",
        gradient: "from-red-500 to-red-700",
      },
      purple: {
        bg: "bg-purple-600",
        text: "text-purple-600",
        hover: "hover:bg-purple-700",
        border: "border-purple-600",
        gradient: "from-purple-500 to-purple-700",
      },
    };
    return colorMap[scheme] || colorMap.indigo;
  };

  const colorClasses = getColorClasses(themeOptions.colorScheme);
  const fontClass = `font-${themeOptions.fontFamily}`;

  // Variantes de animación para el contenido principal
  const mainVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  // Variantes para el efecto de desplazamiento
  const scrollVariants = {
    initial: { y: 0 },
    scroll: {
      y: scrollY > 50 ? -10 : 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${fontClass} overflow-hidden`}
    >
      {/* PromoBanner */}
      <AnimatePresence>
        {showPromoBanner && (
          <PromoBanner onClose={() => setShowPromoBanner(false)} />
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <motion.div
          animate={scrollY > 20 ? "scroll" : "initial"}
          variants={scrollVariants}
        >
          <Header colorClasses={colorClasses} />
        </motion.div>

        {/* Main con scroll y bordes redondeados */}
        <main className="flex-1 overflow-y-auto p-2 dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={themeOptions.colorScheme}
              variants={mainVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <div className="">{children}</div>
            </motion.div>
          </AnimatePresence>
        </main>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Botón de personalización con animación */}
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
