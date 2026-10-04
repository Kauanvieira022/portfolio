import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import { motion, useReducedMotion } from "framer-motion";
import profile from "../../../data/profile";

import styles from "./About.module.css";

function About({ t }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      className={styles.about}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={reduceMotion ? undefined : { duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.about} title={t.about.title} />

        <div className={styles.grid}>
          <p>{t.about.paragraph.replace("Kauan Machado Vieira", profile.name)}</p>

          <div className={styles.highlights}>
            <div>
              <strong>{t.about.highlights.stack}</strong>
              <span>{t.about.highlights.stackText}</span>
            </div>
            <div>
              <strong>{t.about.highlights.academic}</strong>
              <span>{t.about.highlights.academicText}</span>
            </div>
            <div>
              <strong>{t.about.highlights.approach}</strong>
              <span>{t.about.highlights.approachText}</span>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

export default About;
