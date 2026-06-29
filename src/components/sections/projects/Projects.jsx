import { motion } from "framer-motion";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import projects from "../../../data/projects";

import styles from "./Projects.module.css";

function Projects({ language, t }) {
  const items = projects[language] ?? projects.en;

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
      id="projects"
      className={styles.projects}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.projects} title={t.projects.title} />

        <p className={styles.intro}>{t.projects.intro}</p>

        <motion.article
          className={styles.featured}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.featuredContent}>
            <span className={styles.featuredTag}>{t.projects.featuredTag}</span>
            <h3>{t.projects.featuredTitle}</h3>
            <p>{t.projects.featuredText}</p>
          </div>
          <div className={styles.featuredStack}>
            <span>React</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>Power BI</span>
          </div>
        </motion.article>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((project) => (
            <motion.article
              key={project.title}
              className={styles.card}
              variants={itemVariants}
            >
              <span className={styles.status}>{project.status}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}

export default Projects;
