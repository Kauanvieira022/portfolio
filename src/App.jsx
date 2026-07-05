import { useEffect, useMemo, useState } from "react";

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
import PixelNavigationTransition from "./components/ui/PixelNavigationTransition/PixelNavigationTransition";
import PixelProgress from "./components/ui/PixelProgress/PixelProgress";
import PixelTransition from "./components/ui/PixelTransition/PixelTransition";
import translations from "./data/translations";
import styles from "./App.module.css";

function App() {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-language") || "pt";
    }

    return "pt";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  return (
    <div className={styles.app}>
      <PixelBackground className={styles.pixelBackground} />
      <PixelCursor />
      <PixelNavigationTransition />
      <PixelProgress t={t} />

      <Navbar language={language} setLanguage={setLanguage} t={t} />

      <main className={styles.main}>
        <Hero language={language} t={t} />
        <PixelTransition />
        <About language={language} t={t} />
        <PixelTransition />
        <Skills language={language} t={t} />
        <PixelTransition />
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
  );
}

export default App;
