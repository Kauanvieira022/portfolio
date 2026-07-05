import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import Container from "../../ui/Container";
import profile from "../../../data/profile";
import social from "../../../data/social";

import styles from "./Footer.module.css";

function Footer({ language }) {
  const icons = {
    github: <FaGithub size={16} aria-hidden="true" />,
    linkedin: <FaLinkedin size={16} aria-hidden="true" />,
    email: <FiMail size={16} aria-hidden="true" />,
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <p>{profile.name}</p>

          <div className={styles.links}>
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.id === "email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={item.label === "Email" ? (language === "pt" ? "E-mail" : "Email") : item.label}
                title={item.label === "Email" ? (language === "pt" ? "E-mail" : "Email") : item.label}
              >
                {icons[item.id]}
                <span>{item.label === "Email" ? (language === "pt" ? "E-mail" : "Email") : item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.outro} aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
