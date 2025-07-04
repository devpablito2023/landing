import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContactForm } from "../../hooks/useContactForm";

// 🔧 FormField movido FUERA del componente principal
const FormField = ({
  name,
  type = "text",
  label,
  required,
  isTextarea,
  formData,
  handleChange,
}) => {
  const hasValue = formData[name]?.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
          hasValue
            ? "top-2 text-xs text-blue-600 dark:text-blue-400 font-semibold"
            : "top-4 text-gray-500 dark:text-gray-400"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          rows={4}
          className={`w-full px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none
            transition-all duration-200 resize-none relative z-0 ${
              hasValue ? "pt-6 pb-2" : "py-4"
            }`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className={`w-full px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none
            transition-all duration-200 relative z-0 ${
              hasValue ? "pt-6 pb-2" : "py-4"
            }`}
        />
      )}
    </div>
  );
};

// 🎉 SuccessModal también movido fuera
const SuccessModal = ({ submitStatus }) => (
  <AnimatePresence>
    {submitStatus === "success" && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          {/* Icono animado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Título */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-3"
          >
            ¡Mensaje Enviado!
          </motion.h3>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed"
          >
            Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo
            se pondrá en contacto contigo muy pronto.
          </motion.p>

          {/* Barra de progreso */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full"
            />
          </motion.div>

          {/* Texto de cierre automático */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-gray-500 dark:text-gray-400 text-center"
          >
            Este mensaje se cerrará automáticamente
          </motion.p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ContactSection = () => {
  const { formData, isSubmitting, submitStatus, handleChange, handleSubmit } =
    useContactForm();

  const contactInfo = [
    { icon: PhoneIcon, label: "Teléfono", value: "+51 987 654 321" },
    { icon: EnvelopeIcon, label: "Email", value: "info@zgroup.com" },
    { icon: MapPinIcon, label: "Ubicación", value: "Lima, Perú" },
  ];

  return (
    <>
      <section
        id="contacto"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
              Contáctanos
            </span>
            <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 bg-gradient-to-r from-gray-800 to-blue-700 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
              HABLEMOS DE ZTRACK
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Estamos aquí para ayudarte a transformar tu operación
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Información de Contacto
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nuestro equipo especializado está listo para resolver tus
                  dudas y ayudarte a implementar ZTRACK.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Horarios */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  Horarios de Atención
                </h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <p>
                    <span className="font-semibold">Lunes - Viernes:</span> 8:00
                    AM - 6:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Sábados:</span> 9:00 AM -
                    2:00 PM
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      Soporte 24/7:
                    </span>{" "}
                    Clientes premium
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Envíanos un Mensaje
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 👈 Pasando formData y handleChange como props */}
                  <FormField
                    name="nombre"
                    label="Nombre completo"
                    required
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <FormField
                    name="email"
                    type="email"
                    label="Email"
                    required
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <FormField
                    name="mensaje"
                    label="Mensaje"
                    isTextarea
                    required
                    formData={formData}
                    handleChange={handleChange}
                  />

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl flex items-center bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                    >
                      <ExclamationCircleIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">
                        Error al enviar el mensaje. Por favor, inténtalo de
                        nuevo.
                      </span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Al enviar aceptas nuestros términos de privacidad
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🎉 Modal de éxito */}
      <SuccessModal submitStatus={submitStatus} />
    </>
  );
};

export default ContactSection;
