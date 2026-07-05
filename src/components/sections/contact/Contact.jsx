import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import Container from "../../ui/Container";
import Button from "../../ui/Button";
import profile from "../../../data/profile";
import social from "../../../data/social";

import styles from "./Contact.module.css";

function Contact({ t }) {
  const icons = {
    github: <FaGithub size={18} aria-hidden="true" />,
    linkedin: <FaLinkedin size={18} aria-hidden="true" />,
    email: <FiMail size={18} aria-hidden="true" />,
  };

  return (
    <motion.section
      id="contact"
      className={styles.contact}
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <div className={styles.wrapper}>
          <div>
            <span className={styles.eyebrow}>{t.contact.title}</span>
            <h2>{t.contact.heading}</h2>
            <p>{t.contact.paragraph}</p>
          </div>

          <div className={styles.actions}>
            <Button href={`mailto:${profile.email}`} className={styles.actionButton}>
              <span className={styles.buttonContent}>
                {icons.email}
                <span>{t.contact.button}</span>
              </span>
            </Button>
            {social.slice(0, 2).map((item) => (
              <Button
                key={item.label}
                href={item.href}
                target="_blank"
                variant="secondary"
                className={styles.actionButton}
              >
                <span className={styles.buttonContent}>
                  {icons[item.id]}
                  <span>{item.label}</span>
                </span>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

export default Contact;
