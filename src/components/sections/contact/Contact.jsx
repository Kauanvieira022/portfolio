import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";

import Container from "../../ui/Container";
import profile from "../../../data/profile";

import styles from "./Contact.module.css";

function Contact({ t }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className={styles.contact}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? undefined : { duration: 0.42, ease: "easeOut" }}
    >
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>{t.contact.title}</span>
            <h2>{t.contact.heading}</h2>
          </div>

          <div className={styles.actions}>
            <a
              className={styles.emailLink}
              href={`mailto:${profile.email}`}
              aria-label={`${t.contact.emailLabel}: ${profile.email}`}
            >
              <span>{profile.email}</span>
              <FiArrowUpRight aria-hidden="true" />
            </a>

            <div className={styles.socialLinks}>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <HiOutlineDocumentText aria-hidden="true" />
                <span>{t.contact.resumeLabel}</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

export default Contact;
