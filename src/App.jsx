import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/about";
import Skills from "./components/sections/skills";
import Experience from "./components/sections/experience";
import Projects from "./components/sections/projects";
import Contact from "./components/sections/contact";
import PixelBackground from "./components/ui/PixelBackground/PixelBackground";
import PixelCursor from "./components/ui/PixelCursor/PixelCursor";
import PixelTransition from "./components/ui/PixelTransition/PixelTransition";
import translations from "./data/translations";
import styles from "./App.module.css";

function getInitialLanguage() {
  try {
    return localStorage.getItem("portfolio-language") === "en" ? "en" : "pt";
  } catch {
    return "pt";
  }
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = useMemo(() => translations[language] ?? translations.pt, [language]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // Keep the selected language in memory if browser storage is unavailable.
    }

    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.pageDescription);
  }, [language, t]);

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.app}>
        <a className={styles.skipLink} href="#main">
          {t.nav.skipToContent}
        </a>
        <PixelBackground className={styles.codeBackground} language={language} />
        <PixelCursor />

        <Navbar language={language} setLanguage={setLanguage} t={t} />

        <main id="main" className={styles.main} tabIndex={-1}>
          <Hero language={language} t={t} />
          <PixelTransition />
          <About t={t} />
          <Skills language={language} t={t} />
          <Experience language={language} t={t} />
          <PixelTransition />
          <Projects language={language} t={t} />
          <PixelTransition />
          <Contact language={language} t={t} />
        </main>

        <div className={styles.footerLayer}>
          <Footer language={language} t={t} />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
