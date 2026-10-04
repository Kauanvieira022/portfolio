import { useEffect, useRef } from "react";

import styles from "./PixelCursor.module.css";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select";

function PixelCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !dot || !finePointer.matches) {
      return undefined;
    }

    let motionReduced = reducedMotion.matches;
    let frame = null;
    let targetX = -40;
    let targetY = -40;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        frame = null;
      }

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (frame !== null) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event) => {
      if (motionReduced) {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      cursor.dataset.visible = "true";
      dot.dataset.visible = "true";
      cursor.dataset.interactive = String(
        Boolean(event.target.closest(INTERACTIVE_SELECTOR)),
      );

      if (frame === null) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const onPointerLeave = () => {
      cursor.dataset.visible = "false";
      dot.dataset.visible = "false";
      window.cancelAnimationFrame(frame);
      frame = null;
    };

    const onMotionPreferenceChange = () => {
      motionReduced = reducedMotion.matches;

      if (motionReduced) {
        onPointerLeave();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <>
      <span ref={cursorRef} className={styles.cursor} aria-hidden="true" />
      <span ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}

export default PixelCursor;
