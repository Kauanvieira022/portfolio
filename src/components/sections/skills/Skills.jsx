import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import skills from "../../../data/skills";

import styles from "./Skills.module.css";

function Skills({ t }) {
  return (
    <section id="skills" className={styles.skills}>
      <Container>
        <SectionTitle subtitle={t.sectionSubtitles.skills} title={t.skills.title} />

        <p className={styles.intro}>{t.skills.intro}</p>

        <div className={styles.grid}>
          {skills.map((group) => (
            <article key={group.category} className={styles.card}>
              <h3>{group.category}</h3>
              <div className={styles.list}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Skills;
