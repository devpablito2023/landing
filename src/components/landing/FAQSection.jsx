import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CogIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import OptimizedMotion from "../common/OptimizedMotion";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";

// Variantes minimalistas
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const FAQSection = () => {
  const { isScrolling, isVisible } = useScrollOptimization();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 4 categorías esenciales
  const faqCategories = [
    {
      title: "Tecnología",
      icon: CogIcon,
      gradient: "from-blue-500 to-cyan-500",
      count: 2,
      description: "Funcionamiento y especificaciones",
    },
    {
      title: "Seguridad",
      icon: ShieldCheckIcon,
      gradient: "from-emerald-500 to-teal-500",
      count: 1,
      description: "Protección de datos",
    },
    {
      title: "Compatibilidad",
      icon: GlobeAltIcon,
      gradient: "from-purple-500 to-indigo-500",
      count: 1,
      description: "Integración con equipos",
    },
    {
      title: "Servicio",
      icon: ClockIcon,
      gradient: "from-orange-500 to-red-500",
      count: 1,
      description: "Planes y soporte",
    },
  ];

  // 5 FAQs esenciales
  const faqs = [
    {
      category: "Tecnología",
      question: "¿Qué es ZTRACK?",
      answer:
        "Sistema IoT avanzado para monitoreo de contenedores refrigerados con comunicaciones satelitales y análisis en tiempo real.",
      icon: LightBulbIcon,
    },
    {
      category: "Tecnología",
      question: "¿Cómo funciona el sistema?",
      answer:
        "Sensores IoT de alta precisión recopilan datos continuamente y los transmiten mediante múltiples protocolos de comunicación.",
      icon: CogIcon,
    },
    {
      category: "Seguridad",
      question: "¿Cómo se protegen los datos?",
      answer:
        "Encriptación AES-256, certificación ISO 27001, autenticación multifactor y firewalls avanzados.",
      icon: ShieldCheckIcon,
    },
    {
      category: "Compatibilidad",
      question: "¿Es compatible con mi equipo?",
      answer:
        "Compatible con todas las marcas: Carrier, Thermo King, Daikin, etc. Se adapta a diferentes voltajes y sistemas.",
      icon: GlobeAltIcon,
    },
    {
      category: "Servicio",
      question: "¿Cuáles son los planes?",
      answer:
        "Instalación gratuita, planes desde $99/mes por dispositivo, soporte 24/7 incluido.",
      icon: ClockIcon,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openModal = (category = null) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    setOpenIndex(null);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOpenIndex(null);
    setSelectedCategory(null);
    document.body.style.overflow = "unset";
  };

  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  const selectedCategoryInfo = selectedCategory
    ? faqCategories.find((cat) => cat.title === selectedCategory)
    : null;

  return (
    <section
      id="faq"
      className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Minimalista */}
        <OptimizedMotion
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <OptimizedMotion className="inline-block mb-4" variants={fadeInUp}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
              <QuestionMarkCircleIcon className="w-4 h-4 inline mr-2" />
              Preguntas Frecuentes
            </span>
          </OptimizedMotion>

          <OptimizedMotion
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            ¿DUDAS SOBRE{" "}
            <span className="relative">
              <span className="text-blue-400">ZTRACK</span>
              <OptimizedMotion
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
            ?
          </OptimizedMotion>

          <OptimizedMotion
            className="text-xl text-blue-200 max-w-3xl mx-auto mb-8"
            variants={fadeInUp}
          >
            Resolvemos tus consultas con soporte especializado 24/7
          </OptimizedMotion>
        </OptimizedMotion>

        {/* FAQ Categories - 4 tarjetas */}
        <OptimizedMotion
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqCategories.map((category, index) => (
            <OptimizedMotion
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group cursor-pointer hover:bg-white/15 transition-all duration-300"
              variants={cardVariants}
              whileHover={!isScrolling ? { y: -5, scale: 1.02 } : {}}
              onClick={() => openModal(category.title)}
            >
              <OptimizedMotion
                className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                whileHover={!isScrolling ? { scale: 1.1, rotate: 5 } : {}}
              >
                <category.icon className="w-7 h-7 text-white" />
              </OptimizedMotion>
              <h3 className="text-lg font-bold text-center mb-2 group-hover:text-blue-200 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-300 text-center mb-3">
                {category.description}
              </p>
              <div className="text-center">
                <span
                  className={`inline-block bg-gradient-to-r ${category.gradient} text-white px-3 py-1 rounded-full text-xs font-bold`}
                >
                  {category.count} FAQ
                </span>
              </div>
            </OptimizedMotion>
          ))}
        </OptimizedMotion>

        {/* Main CTA */}
        <OptimizedMotion
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <OptimizedMotion
            onClick={() => openModal()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 group cursor-pointer inline-flex items-center"
            whileHover={!isScrolling ? { scale: 1.05, y: -3 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            <QuestionMarkCircleIcon className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
            Ver Todas las Preguntas
            <OptimizedMotion
              className="ml-3"
              animate={!isScrolling && isVisible ? { x: [0, 4, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </OptimizedMotion>
          </OptimizedMotion>
        </OptimizedMotion>
      </div>

      {/* Modal - Mantenido igual pero optimizado */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className={`bg-gradient-to-r ${
                  selectedCategoryInfo
                    ? selectedCategoryInfo.gradient
                    : "from-blue-600 to-purple-600"
                } p-6 flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <OptimizedMotion
                    className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4"
                    whileHover={!isScrolling ? { scale: 1.1, rotate: 10 } : {}}
                  >
                    {selectedCategoryInfo ? (
                      <selectedCategoryInfo.icon className="w-6 h-6 text-white" />
                    ) : (
                      <QuestionMarkCircleIcon className="w-6 h-6 text-white" />
                    )}
                  </OptimizedMotion>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedCategory
                        ? `${selectedCategory}`
                        : "Preguntas Frecuentes"}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {selectedCategory
                        ? selectedCategoryInfo?.description
                        : "Todo sobre ZTRACK"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {selectedCategory && (
                    <OptimizedMotion
                      onClick={() => setSelectedCategory(null)}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors cursor-pointer"
                      whileHover={!isScrolling ? { scale: 1.05 } : {}}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver Todas
                    </OptimizedMotion>
                  )}
                  <OptimizedMotion
                    onClick={closeModal}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                    whileHover={!isScrolling ? { scale: 1.1, rotate: 90 } : {}}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="w-6 h-6 text-white" />
                  </OptimizedMotion>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Category Filter Pills */}
                {!selectedCategory && (
                  <OptimizedMotion
                    className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-white/20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {faqCategories.map((category, index) => (
                      <OptimizedMotion
                        key={index}
                        onClick={() => setSelectedCategory(category.title)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-gradient-to-r ${category.gradient} text-white cursor-pointer`}
                        whileHover={!isScrolling ? { scale: 1.05 } : {}}
                        whileTap={{ scale: 0.95 }}
                      >
                        <category.icon className="w-4 h-4 inline mr-2" />
                        {category.title} ({category.count})
                      </OptimizedMotion>
                    ))}
                  </OptimizedMotion>
                )}

                {/* FAQ List */}
                <OptimizedMotion
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  key={selectedCategory}
                >
                  {filteredFaqs.map((faq, index) => (
                    <OptimizedMotion
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group hover:bg-white/15 transition-all duration-300"
                      variants={cardVariants}
                      whileHover={!isScrolling ? { scale: 1.01 } : {}}
                    >
                      <OptimizedMotion
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-6 text-left flex items-center justify-between focus:outline-none cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center flex-1">
                          <OptimizedMotion
                            className={`w-10 h-10 bg-gradient-to-r ${
                              selectedCategoryInfo
                                ? selectedCategoryInfo.gradient
                                : "from-blue-500 to-purple-500"
                            } rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}
                            whileHover={
                              !isScrolling ? { scale: 1.1, rotate: 10 } : {}
                            }
                          >
                            <faq.icon className="w-5 h-5 text-white" />
                          </OptimizedMotion>
                          <div className="flex-1">
                            <div className="text-xs text-blue-300 mb-1 font-semibold uppercase tracking-wider">
                              {faq.category}
                            </div>
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                              {faq.question}
                            </h4>
                          </div>
                        </div>
                        <OptimizedMotion
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 ml-4"
                        >
                          <ChevronDownIcon className="w-6 h-6 text-blue-300" />
                        </OptimizedMotion>
                      </OptimizedMotion>

                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                className="border-t border-white/20 pt-6 ml-14"
                              >
                                <p className="text-gray-200 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </OptimizedMotion>
                  ))}
                </OptimizedMotion>

                {/* Empty State */}
                {filteredFaqs.length === 0 && (
                  <OptimizedMotion
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      No hay preguntas en esta categoría
                    </h3>
                    <p className="text-gray-300">
                      Selecciona otra categoría o contacta soporte
                    </p>
                  </OptimizedMotion>
                )}

                {/* Modal Footer - Simplificado */}
                <OptimizedMotion
                  className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-3">
                      ¿No encontraste tu respuesta?
                    </h4>
                    <p className="text-blue-200 mb-6">
                      Soporte especializado 24/7 disponible
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <OptimizedMotion
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer"
                        whileHover={!isScrolling ? { scale: 1.05, y: -2 } : {}}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChatBubbleLeftRightIcon className="w-5 h-5 inline mr-2" />
                        Chat Ahora
                      </OptimizedMotion>
                      <OptimizedMotion
                        className="border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer"
                        whileHover={!isScrolling ? { scale: 1.05, y: -2 } : {}}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PhoneIcon className="w-5 h-5 inline mr-2" />
                        Llamar
                      </OptimizedMotion>
                    </div>
                  </div>
                </OptimizedMotion>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements - Minimalistas */}
      <OptimizedMotion
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl flex items-center justify-center"
        animate={
          !isScrolling && isVisible
            ? {
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }
            : {}
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <QuestionMarkCircleIcon className="w-8 h-8 text-blue-500/40" />
      </OptimizedMotion>

      <OptimizedMotion
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl flex items-center justify-center"
        animate={
          !isScrolling && isVisible
            ? {
                y: [0, 20, 0],
                scale: [1, 0.8, 1],
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
        <ChatBubbleLeftRightIcon className="w-8 h-8 text-emerald-500/40" />
      </OptimizedMotion>
    </section>
  );
};

export default FAQSection;
