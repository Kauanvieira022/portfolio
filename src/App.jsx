import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/about";
import Skills from "./components/sections/skills";
import Experience from "./components/sections/experience";
import Projects from "./components/sections/projects";
import Contact from "./components/sections/contact";
import translations from "./data/translations";

function App() {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-language") || "pt";
    }

    return "pt";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} t={t} />

      <main>
        <Hero language={language} t={t} />
        <About language={language} t={t} />
        <Skills language={language} t={t} />
        <Experience language={language} t={t} />
        <Projects language={language} t={t} />
        <Contact language={language} t={t} />
      </main>

      <Footer language={language} t={t} />
    </>
  );
}

export default App;
