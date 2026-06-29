import Container from "../../ui/Container";
import profile from "../../../data/profile";
import social from "../../../data/social";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <p>{profile.name}</p>

          <div className={styles.links}>
            {social.map((item) => (
              <a key={item.label} href={item.href} target={item.label === "Email" ? "_self" : "_blank"} rel="noopener noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
