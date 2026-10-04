import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import projects from "../../../data/projects";

import styles from "./Projects.module.css";

function ProjectTags({ tags, label }) {
  return (
    <ul className={styles.tags} aria-label={label}>
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}

function ProjectLink({ href, label, icon = <FiArrowUpRight aria-hidden="true" /> }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {label}
      {icon}
    </a>
  );
}

function Projects({ language, t }) {
  const collection = projects[language] ?? projects.en;
  const featured = collection.items.find((item) => item.id === collection.featuredId);
  const otherProjects = collection.items.filter((item) => item.id !== featured?.id);
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="projects"
      className={styles.projects}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={reduceMotion ? undefined : { duration: 0.42, ease: "easeOut" }}
    >
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.projects} title={t.projects.title} />
        <p className={styles.intro}>{t.projects.intro}</p>

        {featured && (
          <article className={styles.featuredProject}>
            <div className={styles.featuredContent}>
              <div className={styles.featuredMeta}>
                <span>01 / {t.projects.featuredLabel}</span>
                <span>{featured.status}</span>
                {featured.collaboration && <span>{featured.collaboration}</span>}
              </div>

              <h3>{featured.title}</h3>
              <p className={styles.description}>{featured.description}</p>

              <div className={styles.projectContext}>
                <div>
                  <span>{t.projects.challengeLabel}</span>
                  <p>{featured.challenge}</p>
                </div>
                <div>
                  <span>{t.projects.solutionLabel}</span>
                  <p>{featured.solution}</p>
                </div>
              </div>

              <ul className={styles.highlights}>
                {featured.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className={styles.featuredFooter}>
                <ProjectTags tags={featured.tags} label={t.projects.tagsLabel} />
                <div className={styles.featuredActions}>
                  {featured.live && (
                    <ProjectLink href={featured.live} label={t.projects.liveLink} />
                  )}
                  <ProjectLink
                    href={featured.source}
                    label={t.projects.repositoryLink}
                    icon={<FiGithub aria-hidden="true" />}
                  />
                </div>
              </div>
            </div>

          </article>
        )}

        <h3 className={styles.moreTitle}>{t.projects.moreTitle}</h3>

        <div className={styles.projectList}>
          {otherProjects.map((item, index) => (
            <article className={styles.projectRow} key={item.id}>
              <div className={styles.compactHeader}>
                <div>
                  <div className={styles.projectMeta}>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    <span>{item.status}</span>
                    {item.collaboration && <span>{item.collaboration}</span>}
                  </div>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.description}</p>
              </div>

              <ul className={styles.compactHighlights}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className={styles.compactFooter}>
                <ProjectTags tags={item.tags} label={t.projects.tagsLabel} />
                <ProjectLink
                  href={item.source}
                  label={t.projects.repositoryLink}
                  icon={<FiGithub aria-hidden="true" />}
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}

export default Projects;
