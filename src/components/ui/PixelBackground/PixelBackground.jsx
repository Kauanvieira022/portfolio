import { useEffect, useRef } from "react";

const COLORS = {
  sage: 0xa8c5ad,
  paper: 0xf2f1ec,
  teal: 0x7fa7a0,
  amber: 0xd1ad68,
  border: 0x303630,
};

const PARTICLE_COLORS = [
  COLORS.sage,
  COLORS.paper,
  COLORS.teal,
  COLORS.amber,
];

const SCENES = [
  { trackAlpha: 0.82 },
  { trackAlpha: 0.36 },
  { trackAlpha: 0.58 },
  { trackAlpha: 0.3 },
  { trackAlpha: 0.66 },
  { trackAlpha: 0.4 },
];

function createRandom(seed = 2401) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createPixel(Graphics, size, color, filled) {
  const pixel = new Graphics();

  pixel
    .rect(-size / 2, -size / 2, size, size)
    .fill({ color, alpha: filled ? 0.12 : 0.025 })
    .stroke({ color, width: filled ? 1 : 2, alpha: filled ? 0.34 : 0.48 });

  return pixel;
}

function PixelBackground({ className = "" }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const random = createRandom();
    let app;
    let disposed = false;
    let resizeObserver;
    let elapsed = 0;
    let trackTargetAlpha = 1;
    let activeScene = 0;
    let scrollTarget = window.scrollY;
    let scrollPosition = scrollTarget;

    const setup = async () => {
      const { Application, Container, Graphics } = await import("pixi.js");

      if (disposed) {
        return;
      }

      app = new Application();

      await app.init({
        resizeTo: host,
        backgroundAlpha: 0,
        antialias: false,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 1.5),
        preference: "webgl",
        powerPreference: "high-performance",
      });

      if (disposed) {
        app.destroy(true, { children: true });
        return;
      }

      app.canvas.setAttribute("aria-hidden", "true");
      app.canvas.setAttribute("role", "presentation");
      host.appendChild(app.canvas);

      const grid = new Graphics();
      const horizon = new Graphics();
      const track = new Graphics();
      const particlesLayer = new Container();
      const codeLayer = new Container();
      const codeBits = Array.from({ length: 18 }, (_, index) => {
        const bit = new Graphics();
        const width = 18 + Math.floor(random() * 34);
        const height = 4 + Math.floor(random() * 8);

        bit
          .rect(0, 0, width, height)
          .fill({
            color: index % 3 === 0 ? COLORS.amber : COLORS.sage,
            alpha: 0.16,
          })
          .rect(width + 8, 0, 8, height)
          .fill({ color: COLORS.paper, alpha: 0.12 });

        bit.x = random() * window.innerWidth;
        bit.y = random() * window.innerHeight;
        bit.alpha = 0.25 + random() * 0.2;
        codeLayer.addChild(bit);

        return {
          graphic: bit,
          speed: 22 + random() * 34,
          yRatio: random(),
          phase: random() * Math.PI * 2,
        };
      });
      const particles = Array.from({ length: 34 }, (_, index) => {
        const size = 4 + Math.floor(random() * 14);
        const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];
        const graphic = createPixel(
          Graphics,
          size,
          color,
          index % 4 === 0,
        );
        const data = {
          graphic,
          size,
          speed: 10 + random() * 34,
          verticalSpeed: 5 + random() * 14,
          rotationSpeed: (random() - 0.5) * 1.2,
          phase: random() * Math.PI * 2,
          xRatio: random(),
          yRatio: random(),
        };

        particlesLayer.addChild(graphic);
        return data;
      });

      app.stage.addChild(grid, horizon, codeLayer, particlesLayer, track);

      const updateScene = (jumpToTarget = false) => {
        const scene = SCENES[activeScene] ?? SCENES[0];

        trackTargetAlpha = scene.trackAlpha;

        if (jumpToTarget) {
          track.alpha = trackTargetAlpha;
        }
      };

      const layout = () => {
        const width = app.screen.width;
        const height = app.screen.height;
        const cell = width < 700 ? 40 : 56;
        const trackY = height * 0.82;

        grid.clear();

        for (let x = 0; x <= width + cell; x += cell) {
          grid.moveTo(x, 0).lineTo(x, height);
        }

        for (let y = 0; y <= height + cell; y += cell) {
          grid.moveTo(0, y).lineTo(width + cell, y);
        }

        grid.stroke({ color: COLORS.border, width: 1, alpha: 0.24 });

        horizon
          .clear()
          .moveTo(0, trackY)
          .lineTo(width, trackY)
          .stroke({ color: COLORS.sage, width: 1, alpha: 0.26 });

        track.clear();

        for (let x = -240; x <= width + 480; x += 120) {
          track
            .rect(x, trackY + 16, 72, 26)
            .fill({ color: COLORS.sage, alpha: 0.025 })
            .stroke({ color: COLORS.sage, width: 1, alpha: 0.2 });

          track
            .poly([
              x + 78,
              trackY,
              x + 96,
              trackY - 28,
              x + 114,
              trackY,
            ])
            .fill({ color: COLORS.amber, alpha: 0.08 })
            .stroke({ color: COLORS.amber, width: 1, alpha: 0.3 });

          track
            .rect(x + 136, trackY - 46, 42, 10)
            .fill({ color: COLORS.teal, alpha: 0.08 })
            .stroke({ color: COLORS.teal, width: 1, alpha: 0.24 });
        }

        particles.forEach((particle) => {
          particle.graphic.x = particle.xRatio * width;
          particle.graphic.y = particle.yRatio * height;
        });

        updateScene(true);
      };

      const onScroll = () => {
        scrollTarget = window.scrollY;
        const marker = scrollTarget + window.innerHeight * 0.52;
        const sections = document.querySelectorAll("main section[id]");
        let nextScene = 0;

        sections.forEach((section, index) => {
          if (section.offsetTop <= marker) {
            nextScene = index;
          }
        });

        activeScene = Math.min(nextScene, SCENES.length - 1);
        updateScene();
      };

      resizeObserver = new ResizeObserver(layout);
      resizeObserver.observe(host);
      window.addEventListener("scroll", onScroll, { passive: true });

      app.ticker.maxFPS = reducedMotion.matches ? 24 : 48;
      app.ticker.add((ticker) => {
        const motionFactor = reducedMotion.matches ? 0.35 : 1;
        const deltaSeconds = Math.min(ticker.deltaMS / 1000, 0.05);
        const width = app.screen.width;
        const height = app.screen.height;
        const cell = width < 700 ? 40 : 56;

        elapsed += deltaSeconds * motionFactor;
        scrollPosition += (scrollTarget - scrollPosition) * 0.035;
        track.alpha += (trackTargetAlpha - track.alpha) * 0.04;

        grid.x = -(elapsed * 18) % cell;
        grid.y = -(scrollPosition * 0.025) % cell;
        horizon.alpha = 0.72 + Math.sin(elapsed * 4.4) * 0.16;
        track.x = -(elapsed * 52) % 240;

        const beat = Math.pow(
          Math.max(0, Math.sin(elapsed * Math.PI * 2 * 1.1)),
          10,
        );

        codeBits.forEach((bit, index) => {
          const graphic = bit.graphic;

          graphic.x -= bit.speed * deltaSeconds * motionFactor;
          graphic.y += Math.sin(elapsed * 1.4 + bit.phase) * 0.09;

          if (graphic.x < -90) {
            graphic.x = width + 90;
            graphic.y = bit.yRatio * height + (index % 4) * 12;
          }
        });

        particles.forEach((particle, index) => {
          const graphic = particle.graphic;

          graphic.x -= particle.speed * deltaSeconds * motionFactor;
          graphic.y +=
            Math.sin(elapsed * particle.verticalSpeed * 0.1 + particle.phase) *
            0.16;
          graphic.rotation +=
            particle.rotationSpeed * deltaSeconds * motionFactor;
          graphic.alpha =
            0.32 +
            Math.sin(elapsed * 1.8 + particle.phase) * 0.12 +
            beat * (index % 3 === 0 ? 0.18 : 0.04);

          if (graphic.x < -particle.size) {
            graphic.x = width + particle.size;
            graphic.y =
              ((particle.yRatio * height + index * 17) % height) + 1;
          }
        });
      });

      layout();
      onScroll();

      app.cleanupPixelBackground = () => {
        window.removeEventListener("scroll", onScroll);
      };
    };

    setup();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      app?.cleanupPixelBackground?.();

      if (app?.renderer) {
        app.destroy(true, { children: true });
      }
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}

export default PixelBackground;
