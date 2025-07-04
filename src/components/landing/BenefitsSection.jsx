import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
  BoltIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import AnimatedSection from "../common/AnimatedSection";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";
import { optimizedVariants } from "../../utils/motionHelpers";

const BenefitsSection = () => {
  const { isScrolling, isVisible } = useScrollOptimization();

  const benefits = [
    {
      title: "Gráficas Interactivas",
      description:
        "Obtén el recorrido histórico de tu dispositivo y en tiempo real con visualizaciones avanzadas y análisis predictivo.",
      icon: ChartBarIcon,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient:
        "from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20",
      features: [
        "Dashboards en tiempo real",
        "Análisis predictivo",
        "Exportación de datos",
      ],
    },
    {
      title: "Modo Madurador",
      description:
        "Todos los datos del proceso de maduración de tus productos en un click con control automático de ciclos.",
      icon: ClockIcon,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient:
        "from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20",
      features: [
        "Control automático",
        "Ciclos personalizados",
        "Optimización de tiempos",
      ],
    },
    {
      title: "Revisión del Recorrido",
      description:
        "ZTRACK utiliza GNSS para asegurar visibilidad constante de activos con precisión centimétrica.",
      icon: MapPinIcon,
      color: "purple",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient:
        "from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20",
      features: [
        "GPS de alta precisión",
        "Geofencing inteligente",
        "Rutas optimizadas",
      ],
    },
    {
      title: "Correos Automáticos",
      description:
        "Recibe notificaciones inteligentes de los eventos que ocurren en tu dispositivo con escalamiento automático.",
      icon: EnvelopeIcon,
      color: "red",
      gradient: "from-red-500 to-orange-500",
      bgGradient:
        "from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20",
      features: [
        "Alertas inteligentes",
        "Múltiples canales",
        "Escalamiento automático",
      ],
    },
    {
      title: "Reportes Avanzados",
      description:
        "Configura las recepciones de reportes diarios, semanales o mensuales con análisis detallado y métricas KPI.",
      icon: DocumentChartBarIcon,
      color: "indigo",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient:
        "from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/20 dark:to-blue-900/20",
      features: [
        "Reportes personalizados",
        "Métricas KPI",
        "Análisis comparativo",
      ],
    },
    {
      title: "Compatibilidad Total",
      description:
        "Compatible con la gran mayoría de dispositivos del mercado, instalación fácil y económica con soporte 24/7.",
      icon: ShieldCheckIcon,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      bgGradient:
        "from-orange-50/80 to-amber-50/80 dark:from-orange-900/20 dark:to-amber-900/20",
      features: ["Plug & Play", "Soporte 24/7", "Actualizaciones OTA"],
    },
  ];

  const stats = [
    {
      icon: ArrowTrendingUpIcon,
      value: "98%",
      label: "Eficiencia Mejorada",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BoltIcon,
      value: "45%",
      label: "Reducción de Costos",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: GlobeAltIcon,
      value: "24/7",
      label: "Monitoreo Continuo",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: CheckBadgeIcon,
      value: "99.9%",
      label: "Confiabilidad",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <AnimatedSection
      id="beneficios"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.staggerContainer}
        >
          <motion.div
            className="inline-block mb-6"
            variants={optimizedVariants.fadeInUp}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase shadow-xl">
              <SparklesIcon className="w-4 h-4 inline mr-2" />
              Beneficios Exclusivos
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent"
            variants={optimizedVariants.fadeInUp}
          >
            BENEFICIOS{" "}
            <span className="relative">
              <span className="text-blue-600 dark:text-blue-400">Z</span>
              <span className="text-purple-600 dark:text-purple-400">
                TRACK
              </span>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={optimizedVariants.fadeInUp}
          >
            Descubre cómo ZTRACK transforma tu operación con tecnología de
            vanguardia y beneficios tangibles que impactan directamente en tu
            rentabilidad
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/20 group"
              variants={optimizedVariants.cardVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.staggerContainer}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${benefit.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                variants={optimizedVariants.cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  rotateY: 2,
                }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 mb-6 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>

                  {/* Features List */}
                  <motion.ul
                    className="space-y-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={optimizedVariants.staggerContainer}
                  >
                    {benefit.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300"
                        variants={optimizedVariants.fadeInLeft}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className={`w-2 h-2 bg-gradient-to-r ${benefit.gradient} rounded-full mr-3 flex-shrink-0`}
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Bottom Accent */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient} rounded-b-3xl`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.fadeInUp}
        >
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl"></div>
            </div>

            <motion.h3
              className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 relative z-10"
              variants={optimizedVariants.fadeInUp}
            >
              Transforma tu{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Operación
              </span>{" "}
              Hoy Mismo
            </motion.h3>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto relative z-10"
              variants={optimizedVariants.fadeInUp}
            >
              Únete a más de 1,000 empresas que ya experimentan los beneficios
              de ZTRACK y optimizan sus procesos de refrigeración
            </motion.p>

            {/* Key Benefits Grid */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-10 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={optimizedVariants.staggerContainer}
            >
              {[
                {
                  icon: CpuChipIcon,
                  title: "Tecnología Avanzada",
                  desc: "IoT, IA y comunicaciones satelitales",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: BoltIcon,
                  title: "Implementación Rápida",
                  desc: "Instalación en menos de 24 horas",
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Soporte Garantizado",
                  desc: "Asistencia técnica 24/7 especializada",
                  gradient: "from-purple-500 to-indigo-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group"
                  variants={optimizedVariants.cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <motion.div
                    className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={optimizedVariants.staggerContainer}
            >
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 group relative overflow-hidden"
                variants={optimizedVariants.cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="flex items-center relative z-10">
                  <SparklesIcon className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Solicitar Demo Gratuita
                  <motion.span
                    className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    animate={!isScrolling ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 group backdrop-blur-sm"
                variants={optimizedVariants.cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  borderColor: "#3B82F6",
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <DocumentChartBarIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Descargar Brochure
                  <motion.span
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    whileHover={{ rotate: 20 }}
                  >
                    📋
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400 relative z-10"
              variants={optimizedVariants.fadeInUp}
            >
              <div className="flex items-center">
                <CheckBadgeIcon className="w-5 h-5 text-green-500 mr-2" />
                <span>Certificación ISO 27001</span>
              </div>
              <div className="flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-blue-500 mr-2" />
                <span>Garantía de 3 años</span>
              </div>
              <div className="flex items-center">
                <GlobeAltIcon className="w-5 h-5 text-purple-500 mr-2" />
                <span>Cobertura global</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements - Solo animan cuando no hay scroll */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl flex items-center justify-center"
          animate={
            !isScrolling && isVisible
              ? {
                  y: [0, -25, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChartBarIcon className="w-8 h-8 text-blue-500/40" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl flex items-center justify-center"
          animate={
            !isScrolling && isVisible
              ? {
                  y: [0, 25, 0],
                  x: [0, -20, 0],
                  scale: [1, 0.7, 1],
                  rotate: [0, -180, -360],
                }
              : {}
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <ClockIcon className="w-10 h-10 text-emerald-500/40" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl flex items-center justify-center"
          animate={
            !isScrolling && isVisible
              ? {
                  rotate: [0, 360],
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.7, 0.3],
                }
              : {}
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <EnvelopeIcon className="w-6 h-6 text-orange-500/40" />
        </motion.div>

        <motion.div
          className="absolute top-2/3 left-20 w-16 h-16 bg-gradient-to-r from-purple-400/20  to-indigo-400/20 rounded-full blur-xl flex items-center justify-center"
          animate={
            !isScrolling && isVisible
              ? {
                  y: [0, -15, 0],
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <MapPinIcon className="w-5 h-5 text-purple-500/40" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default BenefitsSection;
