import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  ClockIcon,
  MapPinIcon,
  BoltIcon,
  DocumentChartBarIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  LockClosedIcon,
  UsersIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ArrowTrendingUpIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import OptimizedMotion from "../common/OptimizedMotion";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";
import { optimizedVariants } from "../../utils/animationHelpers";
import monitoreoImage from "../../assets/monitoreo.png";

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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const FeaturesSection = () => {
  const { isScrolling, isVisible } = useScrollOptimization();

  // 4 categorías principales - Minimalistas
  const mainFeatures = [
    {
      title: "MONITOREO",
      icon: ChartBarIcon,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient:
        "from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20",
      stat: "24/7",
      description: "Control continuo en tiempo real",
      items: [
        { text: "Temperaturas en vivo", icon: ClockIcon },
        { text: "Estado del equipo", icon: WrenchScrewdriverIcon },
        { text: "Ubicación GPS", icon: MapPinIcon },
        { text: "Historial completo", icon: DocumentChartBarIcon },
      ],
    },
    {
      title: "CONTROL",
      icon: CpuChipIcon,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient:
        "from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20",
      stat: "100%",
      description: "Gestión remota total",
      items: [
        { text: "Alarmas remotas", icon: ExclamationTriangleIcon },
        { text: "Consumo energético", icon: BoltIcon },
        { text: "Ajuste automático", icon: AdjustmentsHorizontalIcon },
        { text: "Programación", icon: CalendarDaysIcon },
      ],
    },
    {
      title: "SEGURIDAD",
      icon: ShieldCheckIcon,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient:
        "from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20",
      stat: "256-bit",
      description: "Protección empresarial",
      items: [
        { text: "Encriptación avanzada", icon: LockClosedIcon },
        { text: "Multi-usuario", icon: UsersIcon },
        { text: "Backup automático", icon: CloudIcon },
        { text: "Certificaciones", icon: ShieldCheckIcon },
      ],
    },
    {
      title: "ALERTAS",
      icon: BellAlertIcon,
      gradient: "from-orange-500 to-red-500",
      bgGradient:
        "from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20",
      stat: "<30s",
      description: "Notificaciones inteligentes",
      items: [
        { text: "Instantáneas", icon: DevicePhoneMobileIcon },
        { text: "Multi-canal", icon: EnvelopeIcon },
        { text: "Escalamiento", icon: ArrowTrendingUpIcon },
        { text: "Reportes custom", icon: ClipboardDocumentListIcon },
      ],
    },
  ];

  // Stats técnicos - Solo 4 clave
  const techStats = [
    {
      label: "Precisión",
      value: "±0.1°C",
      icon: AdjustmentsHorizontalIcon,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Cobertura",
      value: "Global",
      icon: MapPinIcon,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      label: "Uptime",
      value: "99.9%",
      icon: ShieldCheckIcon,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      label: "Respuesta",
      value: "<1s",
      icon: BoltIcon,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 🎯 HEADER - CAMBIO CRÍTICO: once: false */}
        <OptimizedMotion
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <OptimizedMotion className="inline-block mb-4" variants={fadeInUp}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
              <SparklesIcon className="w-4 h-4 inline mr-2" />
              Funciones Avanzadas
            </span>
          </OptimizedMotion>

          <OptimizedMotion
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            TECNOLOGÍA{" "}
            <span className="relative">
              <span className="text-blue-600 dark:text-blue-400">Z</span>
              <span className="text-purple-600 dark:text-purple-400">
                TRACK
              </span>
              <OptimizedMotion
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: false }}
              />
            </span>
          </OptimizedMotion>

          <OptimizedMotion
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Control total de tu cadena de frío con tecnología IoT de vanguardia
          </OptimizedMotion>
        </OptimizedMotion>

        {/* 🎯 HERO CONTENT - CAMBIO CRÍTICO: once: false */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Imagen principal */}
          <OptimizedMotion
            className="relative order-2 lg:order-1"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="relative group">
              <OptimizedMotion
                className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-2xl"
                animate={
                  !isScrolling && isVisible
                    ? { scale: [1, 1.05, 1], rotate: [0, 2, 0] }
                    : {}
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-2xl border border-white/20">
                <img
                  src={monitoreoImage}
                  alt="ZTRACK Technology"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />

                {/* Floating Stats */}
                <OptimizedMotion
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-2xl shadow-xl"
                  animate={
                    !isScrolling && isVisible
                      ? { y: [0, -8, 0], rotate: [0, 3, 0] }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ClockIcon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-lg font-bold">24/7</div>
                  <div className="text-xs opacity-90">Live</div>
                </OptimizedMotion>

                <OptimizedMotion
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-2xl shadow-xl"
                  animate={
                    !isScrolling && isVisible
                      ? { y: [0, 8, 0], rotate: [0, -3, 0] }
                      : {}
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <CpuChipIcon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-lg font-bold">IoT</div>
                  <div className="text-xs opacity-90">Smart</div>
                </OptimizedMotion>
              </div>
            </div>
          </OptimizedMotion>

          {/* 🎯 TECH STATS - CAMBIO CRÍTICO: once: false */}
          <OptimizedMotion
            className="space-y-6 order-1 lg:order-2"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-white/20">
              <OptimizedMotion
                className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
                variants={fadeInUp}
              >
                Especificaciones{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Técnicas
                </span>
              </OptimizedMotion>

              <OptimizedMotion
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {techStats.map((stat, index) => (
                  <OptimizedMotion
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl group hover:shadow-lg transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={!isScrolling ? { scale: 1.05, y: -2 } : {}}
                  >
                    <OptimizedMotion
                      className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={!isScrolling ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </OptimizedMotion>
                    <div
                      className={`text-xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </OptimizedMotion>
                ))}
              </OptimizedMotion>
            </div>
          </OptimizedMotion>
        </div>

        {/* 🎯 MAIN FEATURES GRID - CAMBIO CRÍTICO: once: false */}
        <OptimizedMotion
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {mainFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <OptimizedMotion
                key={index}
                className={`bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                variants={fadeInUp}
                whileHover={!isScrolling ? { y: -8, scale: 1.02 } : {}}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <OptimizedMotion
                    className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={!isScrolling ? { rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </OptimizedMotion>
                  {/* Stat Badge */}
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} text-white px-3 py-1 rounded-xl shadow-lg text-center min-w-[60px]`}
                  >
                    <div className="text-sm font-black">{feature.stat}</div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-6 relative z-10">
                  <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Features List - Minimalista */}
                <OptimizedMotion
                  className="space-y-3 relative z-10"
                  variants={staggerContainer}
                >
                  {feature.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <OptimizedMotion
                        key={itemIndex}
                        className="flex items-center group/item"
                        variants={fadeInUp}
                        whileHover={!isScrolling ? { x: 5 } : {}}
                      >
                        <OptimizedMotion
                          className={`mr-3 p-1.5 bg-gradient-to-r ${feature.gradient} rounded-lg group-hover/item:scale-110 transition-all duration-300`}
                          whileHover={!isScrolling ? { rotate: 15 } : {}}
                        >
                          <ItemIcon className="w-4 h-4 text-white" />
                        </OptimizedMotion>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300">
                          {item.text}
                        </span>
                      </OptimizedMotion>
                    );
                  })}
                </OptimizedMotion>

                {/* Bottom Accent */}
                <OptimizedMotion
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: false }}
                />
              </OptimizedMotion>
            );
          })}
        </OptimizedMotion>

        {/* 🎯 CTA SECTION - CAMBIO CRÍTICO: once: false */}
        <OptimizedMotion
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-3xl p-12 border border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-3xl" />
            </div>

            <OptimizedMotion
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 relative z-10"
              variants={fadeInUp}
            >
              ¿Listo para{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Revolucionar
              </span>{" "}
              tu Operación?
            </OptimizedMotion>

            <OptimizedMotion
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto relative z-10"
              variants={fadeInUp}
            >
              Únete a más de 1,000 empresas que optimizan con ZTRACK
            </OptimizedMotion>

            {/* Key Benefits - 3 tarjetas */}
            <OptimizedMotion
              className="grid md:grid-cols-3 gap-6 mb-8 relative z-10"
              variants={staggerContainer}
            >
              {[
                {
                  icon: DocumentChartBarIcon,
                  title: "Análisis Avanzado",
                  desc: "Reportes y métricas en tiempo real",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: ExclamationTriangleIcon,
                  title: "Alertas Proactivas",
                  desc: "Prevención antes de fallas",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: CloudIcon,
                  title: "Acceso Global",
                  desc: "Control desde cualquier lugar",
                  gradient: "from-emerald-500 to-teal-500",
                },
              ].map((item, index) => (
                <OptimizedMotion
                  key={index}
                  className="bg-white/20 dark:bg-gray-800/20 rounded-xl p-6 border border-white/10 group"
                  variants={fadeInUp}
                  whileHover={!isScrolling ? { y: -5, scale: 1.02 } : {}}
                >
                  <OptimizedMotion
                    className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={!isScrolling ? { scale: 1.1, rotate: 5 } : {}}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </OptimizedMotion>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </OptimizedMotion>
              ))}
            </OptimizedMotion>

            {/* CTA Buttons */}
            <OptimizedMotion
              className="flex flex-wrap justify-center gap-6 relative z-10"
              variants={staggerContainer}
            >
              <OptimizedMotion
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={
                  !isScrolling
                    ? {
                        scale: 1.05,
                        y: -3,
                        borderColor: "#3B82F6",
                      }
                    : {}
                }
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Más Información
                </span>
              </OptimizedMotion>
            </OptimizedMotion>
          </div>
        </OptimizedMotion>

        {/* Floating Elements */}
        <OptimizedMotion
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl flex items-center justify-center"
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
        >
          <ChartBarIcon className="w-8 h-8 text-blue-500/40" />
        </OptimizedMotion>

        <OptimizedMotion
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl flex items-center justify-center"
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
        >
          <CpuChipIcon className="w-12 h-12 text-emerald-500/40" />
        </OptimizedMotion>

        <OptimizedMotion
          className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl flex items-center justify-center"
          animate={
            !isScrolling && isVisible
              ? {
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                }
              : {}
          }
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <BellAlertIcon className="w-6 h-6 text-orange-500/40" />
        </OptimizedMotion>
      </div>
    </section>
  );
};

export default FeaturesSection;
