import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import OptimizedMotion from "../common/OptimizedMotion";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";
import { optimizedVariants } from "../../utils/animationHelpers";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

// Variantes ultra-optimizadas
const slideVariants = {
  enter: { opacity: 0, scale: 1.02 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const HeroSection = ({ y }) => {
  const banners = [banner1, banner2, banner3, banner4];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isScrolling, isVisible } = useScrollOptimization();

  // Auto-play optimizado
  useEffect(() => {
    if (!isAutoPlaying || isScrolling || !isVisible) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isScrolling, isVisible, banners.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <OptimizedMotion
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            skipScrollOptimization={true}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src={banners[currentSlide]}
              alt={`ZTRACK Banner ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
            {/* Overlay más sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
          </OptimizedMotion>
        </AnimatePresence>
      </div>

      {/* Parallax Effect */}
      <OptimizedMotion
        style={{ y: isScrolling ? 0 : y }}
        className="absolute inset-0 opacity-5"
        skipScrollOptimization={true}
      />

      {/* CONTENIDO PRINCIPAL - MINIMALISTA */}
      <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
        <OptimizedMotion
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6" // Reducido de space-y-8
        >
          {/* LOGO ZTRACK - Posición más baja */}
          <OptimizedMotion
            className="mb-6 mt-16" // Agregado mt-16 para bajar el logo
            variants={optimizedVariants.fadeInUp}
          >
            <div className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 flex justify-center items-center">
              <OptimizedMotion
                className="text-white drop-shadow-2xl"
                initial={{ x: -20, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              >
                Z
              </OptimizedMotion>
              <OptimizedMotion
                className="text-blue-400 drop-shadow-2xl"
                initial={{ x: 20, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                TRACK
              </OptimizedMotion>
            </div>

            {/* Tagline súper directo */}
            <OptimizedMotion
              className="text-xl md:text-2xl font-bold text-white/90 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Control Total de tu Cadena de Frío
            </OptimizedMotion>
          </OptimizedMotion>

          {/* PROPUESTA DE VALOR - Una sola línea potente */}
          <OptimizedMotion
            className="text-lg md:text-xl text-white/80 font-medium drop-shadow-lg max-w-3xl mx-auto"
            variants={optimizedVariants.fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Monitoreo 24/7 • Control Remoto • Alertas Inteligentes
          </OptimizedMotion>

          {/* STATS RÁPIDOS - Sin backdrop-blur para no difuminar */}
          <OptimizedMotion
            className="flex flex-wrap justify-center gap-8 md:gap-12 py-6"
            variants={optimizedVariants.fadeInUp}
            transition={{ delay: 0.3 }}
          >
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Monitoreo" },
              { number: "<1s", label: "Respuesta" },
            ].map((stat, index) => (
              <OptimizedMotion
                key={index}
                className="text-center bg-black/30 rounded-2xl px-6 py-4 border border-white/30 shadow-2xl" // Cambiado: sin backdrop-blur-sm
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-white/90 font-medium">
                  {" "}
                  {/* Mejorado contraste */}
                  {stat.label}
                </div>
              </OptimizedMotion>
            ))}
          </OptimizedMotion>

          {/* CTA BUTTONS - Solo 2, más grandes */}
        </OptimizedMotion>
      </div>

      {/* CONTROLES DEL CAROUSEL - Sin backdrop-blur */}
      <OptimizedMotion
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-3 transition-all duration-300 border border-white/20 shadow-xl cursor-pointer group" // Cambiado: sin backdrop-blur-sm
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
        as="button"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
      </OptimizedMotion>

      <OptimizedMotion
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-3 transition-all duration-300 border border-white/20 shadow-xl cursor-pointer group" // Cambiado: sin backdrop-blur-sm
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        as="button"
      >
        <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
      </OptimizedMotion>

      {/* DOTS INDICATORS - Más elegantes */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <OptimizedMotion
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 border border-white/30 shadow-lg cursor-pointer ${
              index === currentSlide
                ? "bg-blue-400 w-8 shadow-blue-400/50"
                : "bg-white/50 hover:bg-white/70 w-2"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={{
              scale: index === currentSlide ? 1.1 : 1,
              opacity: index === currentSlide ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
            as="button"
          />
        ))}
      </div>

      {/* SCROLL INDICATOR - Sin backdrop-blur */}
      <OptimizedMotion
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10"
        animate={!isScrolling && isVisible ? { y: [0, 6, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center shadow-xl">
          {" "}
          {/* Cambiado: sin backdrop-blur-sm */}
          <OptimizedMotion
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={
              !isScrolling && isVisible
                ? { opacity: [0.4, 1, 0.4], y: [0, 3, 0] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </div>
      </OptimizedMotion>

      {/* SLIDE COUNTER - Sin backdrop-blur */}
      <OptimizedMotion
        className="absolute top-8 right-8 z-20 bg-black/40 rounded-full px-4 py-2 text-white text-sm font-medium border border-white/20 shadow-xl" // Cambiado: sin backdrop-blur-sm
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <OptimizedMotion
          key={currentSlide}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentSlide + 1} / {banners.length}
        </OptimizedMotion>
      </OptimizedMotion>
    </section>
  );
};

export default HeroSection;
