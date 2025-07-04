// Variantes de animación optimizadas y reutilizables
export const optimizedVariants = {
  // Fade in básico optimizado
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  fadeInDown: {
    hidden: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  fadeInLeft: {
    hidden: {
      opacity: 0,
      x: -40,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },

  fadeInRight: {
    hidden: {
      opacity: 0,
      x: 40,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },

  fadeInScale: {
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Container con stagger optimizado
  staggerContainer: {
    hidden: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: "easeOut",
      },
    },
  },

  // Variante para cards optimizada
  cardVariants: {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Variante para elementos flotantes
  floatingElement: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Variante para botones
  buttonHover: {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  },

  // Variante para iconos rotativos
  iconRotate: {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Variante para elementos que aparecen desde abajo
  slideUp: {
    hidden: {
      opacity: 0,
      y: 100,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  },

  // Variante para texto que se escribe
  typewriter: {
    hidden: {
      width: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      width: "auto",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  },
};

// Variantes específicas para diferentes tipos de contenido
export const contentVariants = {
  hero: {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  },

  feature: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  stat: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  },
};

// Transiciones comunes optimizadas
export const optimizedTransitions = {
  default: {
    duration: 0.6,
    ease: "easeOut",
  },

  fast: {
    duration: 0.3,
    ease: "easeOut",
  },

  slow: {
    duration: 1,
    ease: "easeOut",
  },

  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },

  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
};
