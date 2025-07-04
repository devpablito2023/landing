import { motion } from "framer-motion";
import { useScrollOptimization } from "../../hooks/useScrollOptimization";
import { useMemo } from "react";

const AnimatedSection = ({
  children,
  className = "",
  id,
  variants,
  ...props
}) => {
  const { isScrolling } = useScrollOptimization();

  // Variantes optimizadas para secciones
  const sectionVariants = useMemo(() => {
    const baseVariants = variants || {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isScrolling ? 0.2 : 0.6,
          ease: "easeOut",
          staggerChildren: isScrolling ? 0.05 : 0.1,
        },
      },
    };

    // Durante scroll rápido, simplificar animaciones
    if (isScrolling) {
      return {
        hidden: baseVariants.hidden,
        visible: {
          ...baseVariants.visible,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
      };
    }

    return baseVariants;
  }, [variants, isScrolling]);

  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
        amount: isScrolling ? 0.1 : 0.3,
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
