import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useAdminMensajes } from "../../hooks/useAdminMensajes";

const AdminMensajes = () => {
  const {
    mensajes,
    loading,
    stats,
    filtroEstado,
    setFiltroEstado,
    responderMensaje,
    cambiarEstado,
  } = useAdminMensajes();

  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // 🆕 Estado para notificaciones de email

  const estadoConfig = {
    pendiente: {
      color: "bg-yellow-100 text-yellow-800",
      icon: ClockIcon,
      label: "Pendiente",
    },
    en_proceso: {
      color: "bg-blue-100 text-blue-800",
      icon: ChatBubbleLeftRightIcon,
      label: "En Proceso",
    },
    respondido: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircleIcon,
      label: "Respondido",
    },
    cerrado: {
      color: "bg-gray-100 text-gray-800",
      icon: XCircleIcon,
      label: "Cerrado",
    },
  };

  // 🆕 Función mejorada para manejar respuestas con notificaciones de email
  const handleResponder = async () => {
    if (!respuesta.trim() || enviando) return;
    setEnviando(true);

    const result = await responderMensaje(mensajeSeleccionado.id, respuesta);

    if (result.success) {
      setMensajeSeleccionado(null);
      setRespuesta("");

      // 🆕 Mostrar notificación basada en el resultado del email
      if (result.emailSent) {
        setEmailStatus({
          type: "success",
          message: "✅ Respuesta enviada correctamente",
          details: `Email enviado a ${mensajeSeleccionado.email}`,
        });
      } else if (result.emailError) {
        setEmailStatus({
          type: "warning",
          message: "⚠️ Respuesta guardada con advertencia",
          details: `Email falló: ${result.emailError}`,
        });
      } else {
        setEmailStatus({
          type: "success",
          message: "✅ Respuesta guardada",
          details: "La respuesta se ha guardado correctamente",
        });
      }

      // Auto-ocultar notificación después de 5 segundos
      setTimeout(() => setEmailStatus(null), 5000);
    } else {
      setEmailStatus({
        type: "error",
        message: "❌ Error al enviar respuesta",
        details: result.error,
      });
      setTimeout(() => setEmailStatus(null), 5000);
    }
    setEnviando(false);
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    const result = await cambiarEstado(id, nuevoEstado);
    if (!result.success) {
      setEmailStatus({
        type: "error",
        message: "❌ Error al cambiar estado",
        details: result.error,
      });
      setTimeout(() => setEmailStatus(null), 5000);
    } else {
      setEmailStatus({
        type: "success",
        message: "✅ Estado actualizado",
        details: `Estado cambiado a ${nuevoEstado}`,
      });
      setTimeout(() => setEmailStatus(null), 3000);
    }
  };

  // 🆕 Función para limpiar notificaciones
  const clearEmailStatus = () => {
    setEmailStatus(null);
  };

  const EstadoBadge = ({ estado }) => {
    const config = estadoConfig[estado];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const StatsCard = ({ title, count, color, icon: Icon }) => (
    <div className={`${color} rounded-xl p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold">{count || 0}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Panel de Mensajes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gestiona y responde los mensajes de contacto
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Mensajes"
            count={stats.total}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            icon={ChatBubbleLeftRightIcon}
          />
          <StatsCard
            title="Pendientes"
            count={stats.pendientes}
            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
            icon={ClockIcon}
          />
          <StatsCard
            title="Respondidos"
            count={stats.respondidos}
            color="bg-gradient-to-r from-green-500 to-green-600"
            icon={CheckCircleIcon}
          />
          <StatsCard
            title="Cerrados"
            count={stats.cerrados}
            color="bg-gradient-to-r from-gray-500 to-gray-600"
            icon={XCircleIcon}
          />
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {["all", "pendiente", "en_proceso", "respondido", "cerrado"].map(
            (estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filtroEstado === estado
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {estado === "all"
                  ? "Todos"
                  : estadoConfig[estado]?.label || estado}
              </button>
            )
          )}
        </div>

        {/* Lista de Mensajes */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando mensajes...</p>
            </div>
          ) : mensajes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay mensajes para mostrar</p>
            </div>
          ) : (
            mensajes.map((mensaje) => (
              <motion.div
                key={mensaje.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {mensaje.nombre}
                      </h3>
                      <EstadoBadge estado={mensaje.estado} />
                      {/* 🆕 Indicador de email enviado */}
                      {mensaje.estado === "respondido" &&
                        mensaje.fecha_respuesta && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <EnvelopeIcon className="w-3 h-3 mr-1" />
                            Email enviado
                          </span>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {mensaje.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Cambiar Estado */}
                    <select
                      value={mensaje.estado}
                      onChange={(e) =>
                        handleCambiarEstado(mensaje.id, e.target.value)
                      }
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="respondido">Respondido</option>
                      <option value="cerrado">Cerrado</option>
                    </select>
                    {/* Ver/Responder */}
                    <button
                      onClick={() => setMensajeSeleccionado(mensaje)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <EyeIcon className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {mensaje.mensaje}
                </p>
                {mensaje.respuesta && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <p className="text-sm font-medium text-green-800 mb-1">
                      Respuesta de {mensaje.respondido_por}:
                    </p>
                    <p className="text-green-700">{mensaje.respuesta}</p>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Recibido: {new Date(mensaje.created_at).toLocaleString()}
                  </span>
                  {mensaje.fecha_respuesta && (
                    <span>
                      Respondido:{" "}
                      {new Date(mensaje.fecha_respuesta).toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Respuesta */}
      <AnimatePresence>
        {mensajeSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mensajeSeleccionado.estado === "respondido"
                    ? "Ver Mensaje"
                    : "Responder Mensaje"}
                </h2>
                <button
                  onClick={() => setMensajeSeleccionado(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircleIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Mensaje Original */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <strong className="text-gray-900 dark:text-white text-lg">
                      {mensajeSeleccionado.nombre}
                    </strong>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {mensajeSeleccionado.email}
                    </p>
                  </div>
                  <EstadoBadge estado={mensajeSeleccionado.estado} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {mensajeSeleccionado.mensaje}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Recibido:{" "}
                  {new Date(mensajeSeleccionado.created_at).toLocaleString()}
                </p>
              </div>

              {/* Respuesta Existente */}
              {mensajeSeleccionado.respuesta && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                    <strong className="text-blue-800 dark:text-blue-300">
                      Respuesta de {mensajeSeleccionado.respondido_por}
                    </strong>
                    {/* 🆕 Indicador de email enviado */}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      <EnvelopeIcon className="w-3 h-3 mr-1" />
                      Email enviado
                    </span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-200 leading-relaxed">
                    {mensajeSeleccionado.respuesta}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    Respondido:{" "}
                    {new Date(
                      mensajeSeleccionado.fecha_respuesta
                    ).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Formulario de Respuesta */}
              {mensajeSeleccionado.estado !== "respondido" && (
                <div className="space-y-4">
                  {/* 🆕 Información sobre el envío de email */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-800">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Se enviará un email automáticamente a:{" "}
                        {mensajeSeleccionado.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tu Respuesta
                    </label>
                    <textarea
                      value={respuesta}
                      onChange={(e) => setRespuesta(e.target.value)}
                      placeholder="Escribe tu respuesta aquí..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition-colors resize-none"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setMensajeSeleccionado(null)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg
                        hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleResponder}
                      disabled={!respuesta.trim() || enviando}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg
                        hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors flex items-center gap-2"
                    >
                      {enviando ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="w-4 h-4" />
                          Enviar Respuesta
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🆕 Notificaciones de estado de email */}
      <AnimatePresence>
        {emailStatus && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm border-l-4 ${
              emailStatus.type === "success"
                ? "bg-green-50 border-green-400 text-green-800"
                : emailStatus.type === "warning"
                ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                : "bg-red-50 border-red-400 text-red-800"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {emailStatus.type === "success" && (
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  )}
                  {emailStatus.type === "warning" && (
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                  )}
                  {emailStatus.type === "error" && (
                    <XCircleIcon className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{emailStatus.message}</p>
                  <p className="text-xs opacity-90 mt-1">
                    {emailStatus.details}
                  </p>
                </div>
              </div>
              <button
                onClick={clearEmailStatus}
                className="ml-2 flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMensajes;
