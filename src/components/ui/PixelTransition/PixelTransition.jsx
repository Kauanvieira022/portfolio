import { motion, useReducedMotion } from "framer-motion";

import styles from "./PixelTransition.module.css";

const PIXELS = Array.from({ length: 7 }, (_, index) => index);

function PixelTransition() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.transition} aria-hidden="true">
      <motion.div
        className={styles.pixels}
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.7 }}
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
                opacity: [0, 0.72, 0.34],
                scale: [0.35, 1, 0.72],
                y: 0,
                transition: {
                  duration: 0.38,
                  delay: index * 0.028,
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
