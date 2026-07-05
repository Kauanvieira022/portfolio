import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import Container from "../../ui/Container";
import navigation from "../../../data/navigation";
import profile from "../../../data/profile";

import styles from "./Navbar.module.css";

function LanguageSwitcher({ language, setLanguage, t }) {
  return (
    <div className={styles.languageSwitcher} role="group" aria-label={t.nav.language}>
      <button
        type="button"
        className={language === "pt" ? styles.activeLanguage : ""}
        onClick={() => setLanguage("pt")}
        aria-label={t.nav.portuguese}
        aria-pressed={language === "pt"}
        lang="pt-BR"
      >
        PT
      </button>
      <button
        type="button"
        className={language === "en" ? styles.activeLanguage : ""}
        onClick={() => setLanguage("en")}
        aria-label={t.nav.english}
        aria-pressed={language === "en"}
        lang="en"
      >
        EN
      </button>
    </div>
  );
}

function Navbar({ language, setLanguage, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstMenuLinkRef = useRef(null);

  const labels = {
    home: t.nav.home,
    about: t.nav.about,
    skills: t.nav.skills,
    experience: t.nav.experience,
    projects: t.nav.projects,
    contact: t.nav.contact,
  };

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    firstMenuLinkRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav} aria-label={t.nav.navigation}>
          <a className={styles.logo} href="#home" onClick={handleNavClick}>
            <h2>{profile.name}</h2>
            <span>{profile.role}</span>
          </a>

          <ul
            id="primary-navigation"
            className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
          >
            {navigation.map((item, index) => (
              <li key={item.id}>
                <a
                  ref={index === 0 ? firstMenuLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                >
                  {labels[item.id] ?? item.label}
                </a>
              </li>
            ))}

            <li className={styles.mobileActions}>
              <LanguageSwitcher language={language} setLanguage={setLanguage} t={t} />
              <div className={styles.mobileLinks}>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                >
                  {t.nav.resume}
                </a>
              </div>
            </li>
          </ul>

          <div className={styles.actions}>
            <LanguageSwitcher language={language} setLanguage={setLanguage} t={t} />
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a
              className={styles.resume}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.nav.resume}
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={24} aria-hidden="true" /> : <FiMenu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
