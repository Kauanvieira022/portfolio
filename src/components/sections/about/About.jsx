import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import profile from "../../../data/profile";

import styles from "./About.module.css";

function About() {
  return (
    <section id="about" className={styles.about}>
      <Container>
        <SectionTitle subtitle="About" title="Building with purpose and consistency" />

        <div className={styles.grid}>
          <p>
            I am {profile.name}, a developer focused on creating modern, maintainable and scalable web applications.
            My work combines frontend interfaces, backend logic and constant improvement through practical projects.
          </p>

          <div className={styles.highlights}>
            <div>
              <strong>Clean structure</strong>
              <span>Components, data and styles separated by responsibility.</span>
            </div>
            <div>
              <strong>Product mindset</strong>
              <span>This portfolio evolves as a real software product.</span>
            </div>
            <div>
              <strong>Continuous learning</strong>
              <span>Focused on React, Node.js, Python and software engineering practices.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
