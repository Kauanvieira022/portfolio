import { motion } from "framer-motion";
import profile from "../../../data/profile";
import technologies from "../../../data/technologies";

import Button from "../../ui/Button";
import Container from "../../ui/Container";

import styles from "./Hero.module.css";
import profilePhoto from "../../../assets/images/profile-photo.png";

function Hero({ t }) {
  return (
    <motion.section
      id="home"
      className={styles.hero}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.badge}>{profile.role}</span>

            <h1>{profile.name}</h1>

            <p>{t.hero.summary}</p>

            <div className={styles.details}>
              <span>{t.hero.description}</span>
              <span>{t.hero.education}</span>
            </div>

            <div className={styles.actions}>
              <Button href="#projects">{t.hero.ctaProjects}</Button>
              <Button href="#contact" variant="secondary">
                {t.hero.ctaContact}
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

          <div className={styles.image}>
            <img
              className={styles.photo}
              src={profilePhoto}
              alt="Kauan Machado Vieira"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

export default Hero;
