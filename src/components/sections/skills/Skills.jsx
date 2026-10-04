import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import { motion, useReducedMotion } from "framer-motion";
import skills from "../../../data/skills";

import styles from "./Skills.module.css";

function Skills({ language, t }) {
  const groups = skills[language] ?? skills.en;
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="skills"
      className={styles.skills}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={reduceMotion ? undefined : { duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.skills} title={t.skills.title} />

        <p className={styles.intro}>{t.skills.intro}</p>

        <div className={styles.matrix}>
          {groups.map((group, index) => (
            <article key={group.category} className={styles.group}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.category}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}

export default Skills;
