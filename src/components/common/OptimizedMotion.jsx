import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useMemo } from "react";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";

const OptimizedMotion = forwardRef(
  (
    {
      children,
      variants,
      initial = "hidden",
      animate = "visible",
      exit,
      transition,
      whileHover,
      whileTap,
      whileInView,
      viewport = { once: true, margin: "-50px" },
      skipScrollOptimization = false,
      ...props
    },
    ref
  ) => {
    const { isScrolling, isVisible } = useScrollOptimization();

    // Optimizar variantes durante scroll
    const optimizedVariants = useMemo(() => {
      if (!variants || skipScrollOptimization) return variants;

      if (isScrolling && !isVisible) {
        return {
          hidden: variants.hidden,
          visible: {
            ...variants.visible,
            transition: { duration: 0.1 },
          },
        };
      }
      return variants;
    }, [variants, isScrolling, isVisible, skipScrollOptimization]);

    // Optimizar animaciones hover durante scroll
    const optimizedHover = useMemo(() => {
      if (isScrolling || !whileHover) return undefined;
      return whileHover;
    }, [whileHover, isScrolling]);

    // Configuración de viewport optimizada
    const optimizedViewport = useMemo(
      () => ({
        ...viewport,
        amount: isScrolling ? 0.1 : viewport.amount || 0.3,
      }),
      [viewport, isScrolling]
    );

    return (
      <motion.div
        ref={ref}
        variants={optimizedVariants}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        whileHover={optimizedHover}
        whileTap={whileTap}
        whileInView={whileInView}
        viewport={optimizedViewport}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

OptimizedMotion.displayName = "OptimizedMotion";

export default OptimizedMotion;
