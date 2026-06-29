import { motion } from "framer-motion";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import profile from "../../../data/profile";

import styles from "./About.module.css";

function About({ t }) {
  return (
    <motion.section
      id="about"
      className={styles.about}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
