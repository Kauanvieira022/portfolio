import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import projects from "../../../data/projects";

import styles from "./Projects.module.css";

function Projects({ language, t }) {
  const collection = projects[language] ?? projects.en;
  const project = collection.featured;
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="projects"
      className={styles.projects}
      initial={reduceMotion ? false : { opacity: 0, translateY: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={reduceMotion ? undefined : { duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.projects} title={t.projects.title} />
        <p className={styles.intro}>{t.projects.intro}</p>

        <article className={styles.caseStudy}>
          <div className={styles.caseTopbar} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <header className={styles.caseHeader}>
            <div>
              <span className={styles.status}>{project.status}</span>
              <h3>{project.title}</h3>
            </div>
            <p>{project.description}</p>
          </header>

          <div className={styles.caseBody}>
            <div className={styles.decisions}>
              <div>
                <span>{t.projects.challengeLabel}</span>
                <p>{project.challenge}</p>
              </div>
              <div>
                <span>{t.projects.solutionLabel}</span>
                <p>{project.solution}</p>
              </div>
            </div>

            <div className={styles.evidence}>
              <span>{t.projects.highlightsLabel}</span>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <footer className={styles.caseFooter}>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.links}>
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                {t.projects.liveLink}
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a href={project.links.source} target="_blank" rel="noopener noreferrer">
                <FiGithub aria-hidden="true" />
                {t.projects.sourceLink}
              </a>
            </div>
          </footer>
        </article>

        <h3 className={styles.moreTitle}>{t.projects.moreTitle}</h3>

        <div className={styles.projectGrid}>
          {collection.items.map((item) => (
            <article className={styles.projectCard} key={item.title}>
              <span className={styles.projectSignal} aria-hidden="true" />
              <div className={styles.projectMeta}>
                <span>{item.status}</span>
                <span>{item.collaboration}</span>
              </div>

              <h4>{item.title}</h4>
              <p>{item.description}</p>

              <ul className={styles.projectHighlights}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className={styles.projectFooter}>
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <a href={item.source} target="_blank" rel="noopener noreferrer">
                  <FiGithub aria-hidden="true" />
                  {t.projects.repositoryLink}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}

export default Projects;
