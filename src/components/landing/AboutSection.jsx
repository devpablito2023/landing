import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  GlobeAltIcon,
  BellAlertIcon,
  BoltIcon,
  ShieldCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import OptimizedMotion from "../common/OptimizedMotion";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";
import { optimizedVariants } from "../../utils/animationHelpers";
import whatisImage from "../../assets/whatis.png";

// Variantes optimizadas
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const AboutSection = () => {
  const { isScrolling, isVisible } = useScrollOptimization();

  // Beneficios clave - Solo 4, súper directos
  const benefits = [
    {
      title: "Monitoreo 24/7",
      icon: ChartBarIcon,
      gradient: "from-blue-500 to-cyan-500",
      stat: "99.9%",
    },
    {
      title: "Control Global",
      icon: GlobeAltIcon,
      gradient: "from-emerald-500 to-teal-500",
      stat: "150+",
    },
    {
      title: "Alertas Smart",
      icon: BellAlertIcon,
      gradient: "from-orange-500 to-red-500",
      stat: "<30s",
    },
    {
      title: "Respuesta Rápida",
      icon: BoltIcon,
      gradient: "from-purple-500 to-indigo-500",
      stat: "<1s",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Pattern - Sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Súper directo */}
        <OptimizedMotion
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <OptimizedMotion className="inline-block mb-4" variants={fadeInUp}>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
              <CpuChipIcon className="w-4 h-4 inline mr-2" />
              Tecnología IoT
            </span>
          </OptimizedMotion>

          <OptimizedMotion
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-800 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            ¿QUÉ ES{" "}
            <span className="relative">
              <span className="text-blue-600 dark:text-blue-400">Z</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                TRACK
              </span>
              <OptimizedMotion
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
            ?
          </OptimizedMotion>
        </OptimizedMotion>

        {/* Main Content - Grid 2 columnas */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Imagen */}
          <OptimizedMotion
            className="relative order-2 lg:order-1"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative group">
              {/* Glow effect */}
              <OptimizedMotion
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl"
                animate={
                  !isScrolling && isVisible ? { scale: [1, 1.05, 1] } : {}
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-2xl border border-white/20">
                <img
                  src={whatisImage}
                  alt="ZTRACK Technology"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />

                {/* Floating badge */}
                <OptimizedMotion
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl shadow-xl"
                  animate={!isScrolling && isVisible ? { y: [0, -8, 0] } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ShieldCheckIcon className="w-6 h-6" />
                </OptimizedMotion>
              </div>
            </div>
          </OptimizedMotion>

          {/* Contenido de texto - Minimalista */}
          <OptimizedMotion
            className="space-y-8 order-1 lg:order-2"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Descripción principal - 2 párrafos cortos */}
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-white/20">
              <OptimizedMotion
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                variants={fadeInUp}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  Solución IoT integral
                </span>{" "}
                para monitoreo y control de contenedores refrigerados.
              </OptimizedMotion>

              <OptimizedMotion
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                variants={fadeInUp}
              >
                Control total desde{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  cualquier lugar del mundo
                </span>
                .
              </OptimizedMotion>
            </div>

            {/* CTA Buttons - Solo 2 */}
            <OptimizedMotion
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <OptimizedMotion
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 group"
                whileHover={!isScrolling ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <BoltIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Conocer Más
                </span>
              </OptimizedMotion>
            </OptimizedMotion>
          </OptimizedMotion>
        </div>

        {/* Benefits Grid - 4 tarjetas minimalistas */}
        <OptimizedMotion
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <OptimizedMotion
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/20 text-center group hover:shadow-2xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={!isScrolling ? { y: -8, scale: 1.02 } : {}}
              >
                {/* Icono */}
                <OptimizedMotion
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={!isScrolling ? { scale: 1.1, rotate: 5 } : {}}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </OptimizedMotion>

                {/* Stat */}
                <div
                  className={`text-2xl font-black bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {benefit.stat}
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {benefit.title}
                </h3>

                {/* Línea decorativa */}
                <OptimizedMotion
                  className={`mt-4 h-1 bg-gradient-to-r ${benefit.gradient} rounded-full mx-auto`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </OptimizedMotion>
            );
          })}
        </OptimizedMotion>

        {/* Bottom CTA - Minimalista */}
        <OptimizedMotion
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl p-8 border border-white/20 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl" />
            </div>

            <OptimizedMotion
              className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 relative z-10"
              variants={fadeInUp}
            >
              Transforma tu{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cadena de Frío
              </span>
            </OptimizedMotion>

            <OptimizedMotion
              className="text-lg text-gray-600 dark:text-gray-300 mb-6 relative z-10"
              variants={fadeInUp}
            >
              Únete a más de 1,000 empresas que confían en ZTRACK
            </OptimizedMotion>

            <OptimizedMotion
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 group relative z-10 inline-flex items-center"
              variants={fadeInUp}
              whileHover={!isScrolling ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <CpuChipIcon className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Contrata hoy
              <OptimizedMotion
                className="ml-2"
                animate={!isScrolling && isVisible ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </OptimizedMotion>
            </OptimizedMotion>
          </div>
        </OptimizedMotion>

        {/* Floating Elements - Minimalistas */}
        <OptimizedMotion
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={
            !isScrolling && isVisible
              ? {
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <OptimizedMotion
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl"
          animate={
            !isScrolling && isVisible
              ? {
                  y: [0, 20, 0],
                  x: [0, -15, 0],
                  scale: [1, 0.8, 1],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
