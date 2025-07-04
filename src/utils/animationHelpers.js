// Utilidades para optimizar animaciones
export const createOptimizedVariants = (baseVariants, isScrolling = false) => {
  if (!baseVariants) return baseVariants;

  const optimized = { ...baseVariants };

  if (isScrolling) {
    Object.keys(optimized).forEach((key) => {
      if (optimized[key]?.transition) {
        optimized[key] = {
          ...optimized[key],
          transition: {
            ...optimized[key].transition,
            duration: Math.min(optimized[key].transition.duration || 0.6, 0.2),
          },
        };
      }
    });
  }

  return optimized;
};

export const safeAnimate = (controls, animation) => {
  try {
    if (controls && typeof controls.start === "function") {
      return controls.start(animation);
    }
  } catch (error) {
    console.warn("Animation error prevented:", error);
  }
  return Promise.resolve();
};

// Variantes base optimizadas
export const optimizedVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },

  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  cardVariants: {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};
