import profile from "../../../data/profile";
import technologies from "../../../data/technologies";

import Button from "../../ui/Button";
import Container from "../../ui/Container";

import styles from "./Hero.module.css";

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.badge}>{profile.role}</span>

            <h1>{profile.name}</h1>

            <p>{profile.description}</p>

            <div className={styles.actions}>
              <Button href="#projects">View Projects</Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </div>

            <div className={styles.techStack} aria-label="Main technologies">
              {technologies.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.image} aria-hidden="true">
            <div className={styles.avatar}>KMV</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
