import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";

import profile from "../../../data/profile";
import Button from "../../ui/Button";
import Container from "../../ui/Container";

import styles from "./Hero.module.css";

function Hero({ language, t }) {
  const reduceMotion = useReducedMotion();
  const systemRows = [
    { label: t.hero.statusLabel, value: t.hero.statusValue },
    { label: t.hero.focusLabel, value: t.hero.focusValue },
  ];

  return (
    <motion.section
      id="home"
      className={styles.hero}
      aria-labelledby="hero-title"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.45, ease: "easeOut" }}
    >
      <Container>
        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.identity}>
              <span>{profile.role[language] ?? profile.role.en}</span>
              <span className={styles.identityDivider} aria-hidden="true">
                /
              </span>
              <span>{t.hero.location}</span>
            </div>

            <h1 id="hero-title" className={styles.name}>
              {profile.name.split(" ").map((namePart) => (
                <span key={namePart}>{namePart.toUpperCase()}</span>
              ))}
            </h1>

            <p className={styles.summary}>{t.hero.summary}</p>

            <div className={styles.actions}>
              <Button href="#projects" className={styles.projectButton}>
                <span>{t.hero.ctaProjects}</span>
                <FiArrowDownRight aria-hidden="true" />
              </Button>
              <a
                className={styles.githubLink}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub aria-hidden="true" />
                <span>{t.hero.ctaGithub}</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className={styles.systemPanel} aria-label={t.hero.panelLabel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelName}>{t.hero.panelName}</span>
              <span className={styles.panelMark} aria-hidden="true" />
            </div>

            <div className={styles.panelBody}>
              <span className={styles.panelIndex}>{t.hero.panelIndex}</span>
              <dl className={styles.systemRows}>
                {systemRows.map((row) => (
                  <div className={styles.systemRow} key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
                <div className={`${styles.systemRow} ${styles.stackRow}`}>
                  <dt>{t.hero.stackLabel}</dt>
                  <dd>
                    {t.hero.stackValue.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className={styles.panelCommand}>
              <span aria-hidden="true">&gt;</span>
              <p>
                {t.hero.tagline}
                <span className={styles.cursor} aria-hidden="true" />
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </motion.section>
  );
}

export default Hero;
