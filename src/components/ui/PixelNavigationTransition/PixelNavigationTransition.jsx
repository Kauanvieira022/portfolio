import { useEffect, useRef, useState } from "react";

import styles from "./PixelNavigationTransition.module.css";

function PixelNavigationTransition() {
  const [active, setActive] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a[href^='#']");

      if (!link) {
        return;
      }

      window.clearTimeout(timerRef.current);
      setActive(false);

      window.requestAnimationFrame(() => {
        setActive(true);
        timerRef.current = window.setTimeout(() => setActive(false), 520);
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      window.clearTimeout(timerRef.current);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      className={`${styles.transition} ${active ? styles.active : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 14 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export default PixelNavigationTransition;
