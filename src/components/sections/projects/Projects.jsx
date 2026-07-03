import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import projects from "../../../data/projects";

import styles from "./Projects.module.css";

function Projects({ language, t }) {
  const project = projects[language] ?? projects.en;

  return (
    <motion.section
      id="projects"
      className={styles.projects}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.projects} title={t.projects.title} />
        <p className={styles.intro}>{t.projects.intro}</p>

        <article className={styles.caseStudy}>
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
              <a href={project.links.live}>
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

        <p className={styles.note}>{t.projects.evidenceNote}</p>
      </Container>
    </motion.section>
  );
}

export default Projects;
