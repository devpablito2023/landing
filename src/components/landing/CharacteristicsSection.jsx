import { motion } from "framer-motion";
import {
  EyeIcon,
  BellAlertIcon,
  BeakerIcon,
  ChartBarIcon,
  ShieldExclamationIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  LockClosedIcon,
  ClockIcon,
  CpuChipIcon,
  SignalIcon,
  CloudIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import AnimatedSection from "../common/AnimatedSection";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";
import { optimizedVariants } from "../../utils/motionHelpers";

const CharacteristicsSection = () => {
  const { isScrolling, isVisible } = useScrollOptimization();

  const characteristics = [
    {
      title: "Supervisión en Tiempo Real",
      description:
        "Monitorea continuamente tus dispositivos con tecnología IoT avanzada, facilitando la identificación de ineficiencias y la optimización de procesos en tiempo real.",
      icon: EyeIcon,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient:
        "from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20",
      features: ["Monitoreo 24/7", "Alertas instantáneas", "Dashboard en vivo"],
      stats: { value: "99.9%", label: "Uptime" },
    },
    {
      title: "Gestión de Alarmas Inteligentes",
      description:
        "Sistema avanzado de notificaciones que configura y recibe alarmas por averías, definiendo parámetros personalizados como temperatura, presión o mensajes de error.",
      icon: BellAlertIcon,
      gradient: "from-red-500 to-orange-500",
      bgGradient:
        "from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20",
      features: [
        "Alertas personalizables",
        "Múltiples canales",
        "Escalamiento automático",
      ],
      stats: { value: "<30s", label: "Respuesta" },
    },
    {
      title: "Control de Combustible Avanzado",
      description:
        "Sensores de alta precisión que proporcionan información exacta del nivel de combustible en generadores, con datos disponibles en línea y análisis predictivo.",
      icon: BeakerIcon,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient:
        "from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20",
      features: [
        "Sensores de precisión",
        "Análisis predictivo",
        "Optimización de consumo",
      ],
      stats: { value: "±2%", label: "Precisión" },
    },
    {
      title: "Decisiones Basadas en Datos",
      description:
        "Plataforma de análisis que ofrece registro histórico completo, identificación de patrones y herramientas de business intelligence para decisiones estratégicas.",
      icon: ChartBarIcon,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient:
        "from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20",
      features: [
        "Big Data Analytics",
        "Machine Learning",
        "Reportes personalizados",
      ],
      stats: { value: "5TB+", label: "Datos procesados" },
    },
    {
      title: "Detección Anti-Robo",
      description:
        "Sistema inteligente que detecta patrones anómalos en niveles de combustible y emite alertas inmediatas ante posibles robos o fugas no autorizadas.",
      icon: ShieldExclamationIcon,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient:
        "from-yellow-50/80 to-orange-50/80 dark:from-yellow-900/20 dark:to-orange-900/20",
      features: [
        "Detección de anomalías",
        "Alertas inmediatas",
        "Análisis forense",
      ],
      stats: { value: "98%", label: "Detección" },
    },
    {
      title: "Optimización de Costos",
      description:
        "El monitoreo preventivo reduce significativamente los costos operativos, previene daños costosos a la carga y minimiza reclamaciones de seguros.",
      icon: CurrencyDollarIcon,
      gradient: "from-green-500 to-emerald-500",
      bgGradient:
        "from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20",
      features: [
        "Mantenimiento predictivo",
        "Reducción de pérdidas",
        "ROI optimizado",
      ],
      stats: { value: "45%", label: "Ahorro promedio" },
    },
    {
      title: "Reportes Automatizados",
      description:
        "Sistema de reportería avanzado que genera automáticamente informes diarios, semanales o mensuales con métricas KPI y análisis comparativo.",
      icon: DocumentTextIcon,
      gradient: "from-indigo-500 to-blue-500",
      bgGradient:
        "from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/20 dark:to-blue-900/20",
      features: [
        "Reportes automáticos",
        "Métricas KPI",
        "Análisis comparativo",
      ],
      stats: { value: "100+", label: "Tipos de reportes" },
    },
    {
      title: "Seguridad de Datos Empresarial",
      description:
        "Infraestructura de seguridad de nivel empresarial que garantiza la confidencialidad, integridad y disponibilidad de todos los datos de tus dispositivos.",
      icon: LockClosedIcon,
      gradient: "from-gray-600 to-gray-800",
      bgGradient:
        "from-gray-50/80 to-slate-50/80 dark:from-gray-900/20 dark:to-slate-900/20",
      features: [
        "Encriptación AES-256",
        "Certificación ISO 27001",
        "Backup automático",
      ],
      stats: { value: "256-bit", label: "Encriptación" },
    },
  ];

  const techSpecs = [
    {
      icon: ClockIcon,
      title: "Tiempo Real",
      value: "< 1 segundo",
      description: "Latencia de datos",
    },
    {
      icon: CpuChipIcon,
      title: "Procesamiento",
      value: "Edge Computing",
      description: "Análisis local",
    },
    {
      icon: SignalIcon,
      title: "Conectividad",
      value: "Multi-protocolo",
      description: "4G/5G/LoRaWAN/Satellite",
    },
    {
      icon: CloudIcon,
      title: "Almacenamiento",
      value: "Cloud Híbrido",
      description: "AWS + Edge Storage",
    },
  ];

  const performanceMetrics = [
    {
      icon: ArrowTrendingUpIcon,
      metric: "99.99%",
      label: "Disponibilidad del Sistema",
      description: "Uptime garantizado con redundancia completa",
    },
    {
      icon: ClockIcon,
      metric: "< 500ms",
      label: "Latencia de Respuesta",
      description: "Procesamiento en tiempo real ultra-rápido",
    },
    {
      icon: GlobeAltIcon,
      metric: "150+",
      label: "Países Soportados",
      description: "Cobertura global con infraestructura local",
    },
    {
      icon: ServerIcon,
      metric: "10M+",
      label: "Datos Procesados/Día",
      description: "Capacidad de procesamiento masivo",
    },
  ];

  return (
    <AnimatedSection
      id="caracteristicas"
      className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
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
              <CpuChipIcon className="w-4 h-4 inline mr-2" />
              Tecnología Avanzada
            </span>
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent"
            variants={optimizedVariants.fadeInUp}
          >
            CARACTERÍSTICAS{" "}
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
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={optimizedVariants.fadeInUp}
          >
            Descubre las características técnicas que hacen de ZTRACK la
            solución más avanzada para el monitoreo y control de sistemas de
            refrigeración
          </motion.p>
        </motion.div>

        {/* Tech Specs Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.staggerContainer}
        >
          {techSpecs.map((spec, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/20 group"
              variants={optimizedVariants.cardVariants}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <spec.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                {spec.title}
              </h4>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400 mb-1">
                {spec.value}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {spec.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Characteristics Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.staggerContainer}
        >
          {characteristics.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                variants={
                  index % 2 === 0
                    ? optimizedVariants.fadeInLeft
                    : optimizedVariants.fadeInRight
                }
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  rotateY: index % 2 === 0 ? 2 : -2,
                }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>

                {/* Header */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center">
                    <motion.div
                      className={`w-16 h-16 mr-4 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  {/* Stats Badge */}
                  <motion.div
                    className={`bg-gradient-to-r ${feature.gradient} text-white px-4 py-2 rounded-xl shadow-lg text-center min-w-[80px]`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-lg font-black">
                      {feature.stats.value}
                    </div>
                    <div className="text-xs opacity-90">
                      {feature.stats.label}
                    </div>
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                  {feature.description}
                </p>

                {/* Features List */}
                <motion.div
                  className="space-y-3 mb-6 relative z-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={optimizedVariants.staggerContainer}
                >
                  {feature.features.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300"
                      variants={optimizedVariants.fadeInLeft}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full mr-3 flex-shrink-0`}
                        whileHover={{ scale: 1.5 }}
                      />
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bottom Accent */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Performance Metrics Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-gray-900 to-blue-900 dark:from-gray-800 dark:to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={optimizedVariants.fadeInUp}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              variants={optimizedVariants.fadeInUp}
            >
              Rendimiento{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Excepcional
              </span>
            </motion.h3>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={optimizedVariants.staggerContainer}
            >
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group"
                  variants={optimizedVariants.cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <metric.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-3xl font-black text-blue-400 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {metric.metric}
                  </motion.div>
                  <h4 className="font-bold mb-2">{metric.label}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
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
            </div>

            <motion.h3
              className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 relative z-10"
              variants={optimizedVariants.fadeInUp}
            >
              ¿Listo para{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experimentar
              </span>{" "}
              la Diferencia?
            </motion.h3>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto relative z-10"
              variants={optimizedVariants.fadeInUp}
            >
              Descubre cómo estas características avanzadas pueden transformar
              tu operación y llevarte al siguiente nivel de eficiencia
            </motion.p>

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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="flex items-center relative z-10">
                  <EyeIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Ver Demo en Vivo
                  <motion.span
                    className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    animate={!isScrolling && isVisible ? { x: [0, 5, 0] } : {}}
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
                  <DocumentTextIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Especificaciones Técnicas
                </span>
              </motion.button>
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
          <CpuChipIcon className="w-8 h-8 text-blue-500/40" />
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
          <SignalIcon className="w-10 h-10 text-emerald-500/40" />
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
          <BellAlertIcon className="w-6 h-6 text-orange-500/40" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default CharacteristicsSection;
