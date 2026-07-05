import { useEffect, useState } from "react";

import navigation from "../../../data/navigation";
import styles from "./PixelProgress.module.css";

function PixelProgress({ t }) {
  const [activeSection, setActiveSection] = useState("home");

  const labels = {
    home: t.nav.home,
    about: t.nav.about,
    skills: t.nav.skills,
    experience: t.nav.experience,
    projects: t.nav.projects,
    contact: t.nav.contact,
  };

  useEffect(() => {
    let frame;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.48;
      let current = navigation[0].id;

      navigation.forEach((item) => {
        const section = document.getElementById(item.id);

        if (section && section.offsetTop <= marker) {
          current = item.id;
        }
      });

      setActiveSection(current);
      frame = undefined;
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className={styles.progress} aria-label={t.nav.navigation}>
      {navigation.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeSection === item.id ? styles.active : ""}
          aria-label={labels[item.id] ?? item.label}
          aria-current={activeSection === item.id ? "location" : undefined}
          title={labels[item.id] ?? item.label}
        />
      ))}
    </nav>
  );
}

export default PixelProgress;
