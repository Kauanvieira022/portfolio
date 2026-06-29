import Container from "../../ui/Container";
import Button from "../../ui/Button";
import profile from "../../../data/profile";
import social from "../../../data/social";

import styles from "./Contact.module.css";

function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <Container>
        <div className={styles.wrapper}>
          <div>
            <span>Contact</span>
            <h2>Let's build something meaningful</h2>
            <p>
              I am open to opportunities, collaborations and conversations about web development and software engineering.
            </p>
          </div>

          <div className={styles.actions}>
            <Button href={`mailto:${profile.email}`}>Send Email</Button>
            {social.slice(0, 2).map((item) => (
              <Button key={item.label} href={item.href} target="_blank" variant="secondary">
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
