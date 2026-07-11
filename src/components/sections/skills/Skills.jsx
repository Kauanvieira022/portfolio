import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import { motion } from "framer-motion";
import skills from "../../../data/skills";

import styles from "./Skills.module.css";

function Skills({ language, t }) {
  const groups = skills[language] ?? skills.en;

  return (
    <motion.section
      id="skills"
      className={styles.skills}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.skills} title={t.skills.title} />

        <p className={styles.intro}>{t.skills.intro}</p>

        <div className={styles.grid}>
          {groups.map((group, index) => (
            <article key={group.category} className={styles.card}>
              <div className={styles.cardHeader}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.category}</h3>
              </div>
              <div className={styles.list}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}

export default Skills;
