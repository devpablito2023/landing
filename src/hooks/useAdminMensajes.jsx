import { useState, useEffect } from "react";

export const useAdminMensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    en_proceso: 0,
    respondidos: 0,
    cerrados: 0,
  });
  const [filtroEstado, setFiltroEstado] = useState("all");

  // 🆕 Estados para el modal de respuesta
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [enviando, setEnviando] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchMensajes = async (estado = filtroEstado, page = 1) => {
    setLoading(true);
    try {
      console.log("🔄 Fetching mensajes...", { estado, page });
      const response = await fetch(
        `${API_URL}/contacts?estado=${estado}&page=${page}&limit=50`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📧 Mensajes recibidos:", data);

      setMensajes(data.mensajes || []);
      return data;
    } catch (error) {
      console.error("❌ Error fetching mensajes:", error);
      setMensajes([]);
      return { mensajes: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      console.log("📊 Fetching stats...");
      const response = await fetch(`${API_URL}/contacts/stats`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📊 Stats recibidas:", data);

      setStats({
        total: parseInt(data.total) || 0,
        pendientes: parseInt(data.pendientes) || 0,
        en_proceso: parseInt(data.en_proceso) || 0,
        respondidos: parseInt(data.respondidos) || 0,
        cerrados: parseInt(data.cerrados) || 0,
      });
    } catch (error) {
      console.error("❌ Error fetching stats:", error);
      setStats({
        total: 0,
        pendientes: 0,
        en_proceso: 0,
        respondidos: 0,
        cerrados: 0,
      });
    }
  };

  const responderMensaje = async (id, respuesta, respondidoPor = "Admin") => {
    try {
      const response = await fetch(`${API_URL}/contact/${id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuesta, respondido_por: respondidoPor }),
      });
      const result = await response.json();
      if (result.ok) {
        await fetchMensajes();
        await fetchStats();
        return { success: true };
      }
      throw new Error(result.error || "Error al responder");
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const cambiarEstado = async (id, estado, usuario = "Admin", comentario) => {
    try {
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado, usuario, comentario }),
      });
      const result = await response.json();
      if (result.ok) {
        await fetchMensajes();
        await fetchStats();
        return { success: true };
      }
      throw new Error(result.error || "Error al cambiar estado");
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 🆕 Función para manejar respuesta desde el modal
  const handleResponder = async () => {
    if (!mensajeSeleccionado || !respuesta.trim()) return;

    setEnviando(true);
    try {
      const result = await responderMensaje(mensajeSeleccionado.id, respuesta);
      if (result.success) {
        setRespuesta("");
        setMensajeSeleccionado(null);
        // Opcional: mostrar notificación de éxito
        console.log("✅ Respuesta enviada correctamente");
      } else {
        console.error("❌ Error al enviar respuesta:", result.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setEnviando(false);
    }
  };

  // 🆕 Función para cambiar estado rápido
  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      const result = await cambiarEstado(id, nuevoEstado);
      if (result.success) {
        console.log("✅ Estado cambiado correctamente");
      } else {
        console.error("❌ Error al cambiar estado:", result.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  useEffect(() => {
    console.log("🔄 useEffect triggered, filtroEstado:", filtroEstado);
    fetchMensajes();
    fetchStats();
  }, [filtroEstado]);

  return {
    // Estados
    mensajes,
    loading,
    stats,
    filtroEstado,
    setFiltroEstado,

    // Modal states
    mensajeSeleccionado,
    setMensajeSeleccionado,
    respuesta,
    setRespuesta,
    enviando,

    // Funciones
    fetchMensajes,
    responderMensaje,
    cambiarEstado,
    handleResponder,
    handleCambiarEstado,
  };
};

export default useAdminMensajes;
