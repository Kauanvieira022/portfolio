import { motion } from "framer-motion";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import skills from "../../../data/skills";

import styles from "./Skills.module.css";

function Skills({ t }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, translateY: 20 },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.section
      id="skills"
      className={styles.skills}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.skills} title={t.skills.title} />

        <p className={styles.intro}>{t.skills.intro}</p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((group) => (
            <motion.article
              key={group.category}
              className={styles.card}
              variants={itemVariants}
            >
              <h3>{group.category}</h3>
              <div className={styles.list}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}

export default Skills;
