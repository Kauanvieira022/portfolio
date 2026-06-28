import profile from "../../../data/profile";
import technologies from "../../../data/technologies";

import Container from "../../ui/Container";

import styles from "./Hero.module.css";

function Hero() {
  return (
    <section id="about" className={styles.hero}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.badge}>
              {profile.role}
            </span>

            <h1>
              {profile.name}
            </h1>

            <p>
              {profile.description}
            </p>

            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryButton}>
                View Projects
              </a>

              <a href="#contact" className={styles.secondaryButton}>
                Contact Me
              </a>
            </div>

            <div className={styles.techStack}>
              {technologies.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.image}>
            <div className={styles.avatar}>
              Photo
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;