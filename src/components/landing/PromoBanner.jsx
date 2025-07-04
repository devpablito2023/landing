import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  SparklesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const PromoBanner = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer - fin del mes actual
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      const difference = endOfMonth - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-hide después de 15 segundos (opcional)
  useEffect(() => {
    const autoHideTimer = setTimeout(() => {
      closeBanner();
    }, 15000);
    return () => clearTimeout(autoHideTimer);
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    // Llamar onClose después de la animación de salida
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  const handleCTAClick = () => {
    // Scroll a la sección de contacto o abrir modal de suscripción
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    // Opcional: cerrar el banner después del click
    // closeBanner();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={closeBanner}
          />

          {/* Banner centrado */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-4xl mx-4"
          >
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl rounded-2xl overflow-hidden">
              {/* Efectos de fondo animados */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="relative p-6 md:p-8">
                {/* Botón cerrar en la esquina superior derecha */}
                <motion.button
                  onClick={closeBanner}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>

                {/* Contenido principal */}
                <div className="text-center space-y-6">
                  {/* Icono y título principal */}
                  <div className="flex flex-col items-center space-y-4">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <SparklesIcon className="w-16 h-16 text-yellow-300" />
                    </motion.div>

                    <div className="space-y-2">
                      <motion.h2
                        className="text-3xl md:text-4xl font-bold"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🔥 ¡OFERTA ESPECIAL! 🔥
                      </motion.h2>

                      <motion.div
                        className="inline-block bg-yellow-400 text-orange-900 px-6 py-2 rounded-full text-xl md:text-2xl font-bold"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(251, 191, 36, 0.7)",
                            "0 0 0 20px rgba(251, 191, 36, 0)",
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        50% OFF
                      </motion.div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="space-y-2">
                    <p className="text-xl md:text-2xl font-semibold">
                      Aprovecha el 50% de descuento en tu suscripción ZTRACK
                    </p>
                    <p className="text-lg opacity-90">
                      Sistema de monitoreo de cadena de frío - Solo por este mes
                    </p>
                  </div>

                  {/* Contador regresivo */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-yellow-300">
                      <ClockIcon className="w-6 h-6" />
                      <span className="text-lg font-medium">
                        ¡La oferta termina en:
                      </span>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {[
                        { label: "Días", value: timeLeft.days },
                        { label: "Horas", value: timeLeft.hours },
                        { label: "Minutos", value: timeLeft.minutes },
                        { label: "Segundos", value: timeLeft.seconds },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[80px] text-center"
                          animate={{
                            scale: item.label === "Segundos" ? [1, 1.1, 1] : 1,
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <div className="text-2xl md:text-3xl font-bold leading-none">
                            {String(item.value).padStart(2, "0")}
                          </div>
                          <div className="text-sm opacity-80 mt-1">
                            {item.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleCTAClick}
                    className="bg-white text-orange-600 hover:text-orange-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 4px 15px rgba(0, 0, 0, 0.2)",
                        "0 8px 25px rgba(0, 0, 0, 0.3)",
                        "0 4px 15px rgba(0, 0, 0, 0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ¡Aprovecha Esta Oferta Ya!
                  </motion.button>
                </div>
              </div>

              {/* Barra de progreso animada */}
              <motion.div
                className="h-2 bg-gradient-to-r from-yellow-400 to-orange-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
