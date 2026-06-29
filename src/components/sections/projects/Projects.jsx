import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import projects from "../../../data/projects";

import styles from "./Projects.module.css";

function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <Container>
        <SectionTitle subtitle="Projects" title="Selected work and studies" />

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.title} className={styles.card}>
              <span className={styles.status}>{project.status}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
