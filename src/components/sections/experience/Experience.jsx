import { motion, useReducedMotion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import experience from "../../../data/experience";

import styles from "./Experience.module.css";

function Experience({ language, t }) {
  const items = experience[language] ?? experience.en;
  const reduceMotion = useReducedMotion();

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
      initial={reduceMotion ? false : { opacity: 0, translateY: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.experience} title={t.experience.title} />

        <motion.div
          key={`experience-${language}`}
          className={styles.timeline}
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => (
            <motion.article
              key={`${item.company}-${item.title}`}
              className={styles.item}
              variants={reduceMotion ? undefined : itemVariants}
            >
              <div className={styles.yearLine}>
                <span>{item.year}</span>
                <span className={styles.yearRule} aria-hidden="true" />
                <span className={item.current ? styles.current : styles.period}>
                  {item.current
                    ? `${t.experience.nowLabel} · ${item.period}`
                    : item.period}
                </span>
              </div>

              <div className={styles.header}>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.company}</strong>
                </div>

                <div className={styles.meta}>
                  <span>{item.type}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <p>{item.description}</p>

              <details className={styles.details}>
                <summary>
                  <span>
                    {t.experience.responsibilitiesLabel} ({item.responsibilities.length})
                  </span>
                  <FiChevronDown aria-hidden="true" />
                </summary>
                <ul className={styles.responsibilities}>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </details>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}

export default Experience;
