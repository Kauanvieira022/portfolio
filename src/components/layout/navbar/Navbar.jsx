import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Navbar.module.css";

import Container from "../../ui/Container";

import navigation from "../../../data/navigation";
import profile from "../../../data/profile";

function Navbar({ language, setLanguage, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const labels = {
    home: t.nav.home,
    about: t.nav.about,
    skills: t.nav.skills,
    experience: t.nav.experience,
    projects: t.nav.projects,
    contact: t.nav.contact,
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>{profile.name}</h2>
            <span>{profile.role}</span>
          </div>

          <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={handleNavClick}>
                  {labels[item.id] ?? item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.langToggle}
              onClick={() => setLanguage(language === "en" ? "pt" : "en")}
            >
              {language === "pt" ? "Português" : "English"}
            </button>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className={styles.resume} href="/resume.pdf">
              {t.nav.resume}
            </a>
          </div>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;