import { motion, useReducedMotion } from "framer-motion";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";

import styles from "./About.module.css";

function About({ t }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      className={styles.about}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={reduceMotion ? undefined : { duration: 0.42, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.about} title={t.about.title} />

        <div className={styles.story}>
          <p className={styles.lead}>{t.about.lead}</p>

          <div className={styles.copy}>
            <p>{t.about.paragraph}</p>
            <div className={styles.formation}>
              <span>{t.about.formationLabel}</span>
              <p>{t.about.formationText}</p>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

export default About;
