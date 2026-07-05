import { motion, useReducedMotion } from "framer-motion";

import styles from "./PixelTransition.module.css";

const PIXELS = Array.from({ length: 11 }, (_, index) => index);

function PixelTransition() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.transition} aria-hidden="true">
      <motion.div
        className={styles.pixels}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: false, amount: 0.7 }}
      >
        {PIXELS.map((pixel) => (
          <motion.span
            key={pixel}
            custom={pixel}
            variants={{
              hidden: {
                opacity: 0,
                scale: 0,
                y: pixel % 2 === 0 ? -8 : 8,
              },
              visible: (index) => ({
                opacity: [0, 0.9, 0.34],
                scale: [0.35, 1, 0.72],
                y: 0,
                transition: {
                  duration: 0.48,
                  delay: index * 0.035,
                  ease: "linear",
                },
              }),
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default PixelTransition;
