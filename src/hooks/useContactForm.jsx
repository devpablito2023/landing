import { useState } from "react";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (data) => {
    // Para Vite usa import.meta.env, para CRA usa process.env
    //const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const API_URL = "/api"; // ¡MUY IMPORTANTE!
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitForm(formData);

      if (result.ok) {
        setSubmitStatus("success");
        setFormData({ nombre: "", email: "", mensaje: "" });

        // 👈 Cerrar el modal automáticamente después de 2 segundos
        setTimeout(() => {
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
        // Error se cierra después de 5 segundos
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitStatus("error");
      // Error se cierra después de 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  };
};
