import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import experience from "../../../data/experience";

import styles from "./Experience.module.css";

function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <Container>
        <SectionTitle subtitle="Experience" title="Professional experience" />

        <div className={styles.timeline}>
          {experience.map((item) => (
            <article key={`${item.company}-${item.title}`} className={styles.item}>
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
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Experience;
