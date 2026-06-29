import { motion } from "framer-motion";
import Container from "../../ui/Container";
import Button from "../../ui/Button";
import profile from "../../../data/profile";
import social from "../../../data/social";

import styles from "./Contact.module.css";

function Contact({ t }) {
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
            <span>{t.contact.title}</span>
            <h2>{t.contact.heading}</h2>
            <p>{t.contact.paragraph}</p>
          </div>

          <div className={styles.actions}>
            <Button href={`mailto:${profile.email}`}>{t.contact.button}</Button>
            {social.slice(0, 2).map((item) => (
              <Button key={item.label} href={item.href} target="_blank" variant="secondary">
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

export default Contact;
