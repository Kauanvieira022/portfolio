import { motion } from "framer-motion";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import experience from "../../../data/experience";

import styles from "./Experience.module.css";

function Experience({ language, t }) {
  const items = experience[language] ?? experience.en;

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
      id="experience"
      className={styles.experience}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.experience} title={t.experience.title} />

        <motion.div
          key={`experience-${language}`}
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => (
            <motion.article
              key={`${item.company}-${item.title}`}
              className={styles.item}
              variants={itemVariants}
            >
              <div className={styles.header}>
                <div>
                  <span className={styles.period}>{item.period}</span>
                  <h3>{item.title}</h3>
                  <strong>{item.company}</strong>
                </div>

                <div className={styles.meta}>
                  <span>{item.type}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <p>{item.description}</p>

              <ul className={styles.responsibilities}>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}

export default Experience;
