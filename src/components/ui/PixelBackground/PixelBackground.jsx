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
  { x: 0.76, y: 0.36, mobileY: 0.7, scale: 0.72, alpha: 0.46, trackAlpha: 0.8 },
  { x: 0.18, y: 0.64, mobileY: 0.24, scale: 0.46, alpha: 0.28, trackAlpha: 0.3 },
  { x: 0.82, y: 0.34, mobileY: 0.76, scale: 0.55, alpha: 0.32, trackAlpha: 0.52 },
  { x: 0.16, y: 0.38, mobileY: 0.22, scale: 0.42, alpha: 0.24, trackAlpha: 0.24 },
  { x: 0.82, y: 0.62, mobileY: 0.78, scale: 0.6, alpha: 0.36, trackAlpha: 0.64 },
  { x: 0.5, y: 0.44, mobileY: 0.34, scale: 0.44, alpha: 0.28, trackAlpha: 0.36 },
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

function createCore(Container, Graphics) {
  const core = new Container();
  const rings = [
    { size: 190, color: COLORS.sage, direction: 1 },
    { size: 138, color: COLORS.teal, direction: -1 },
    { size: 86, color: COLORS.paper, direction: 1 },
  ];

  rings.forEach((ring, index) => {
    const graphic = new Graphics()
      .rect(-ring.size / 2, -ring.size / 2, ring.size, ring.size)
      .stroke({
        color: ring.color,
        width: index === 0 ? 2 : 1,
        alpha: 0.5 - index * 0.08,
      });

    graphic.rotation = index * 0.22;
    graphic.label = `pixel-core-${index}`;
    core.addChild(graphic);
  });

  const center = new Graphics()
    .rect(-18, -18, 36, 36)
    .fill({ color: COLORS.sage, alpha: 0.16 })
    .stroke({ color: COLORS.paper, width: 2, alpha: 0.62 });

  center.rotation = Math.PI / 4;
  center.label = "pixel-core-center";
  core.addChild(center);

  return core;
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
    let coreScale = 1;
    let coreBaseX = 0;
    let coreBaseY = 0;
    let coreTargetX = 0;
    let coreTargetY = 0;
    let coreRenderedScale = 1;
    let coreTargetScale = 1;
    let coreRenderedAlpha = 0.4;
    let coreTargetAlpha = 0.4;
    let trackTargetAlpha = 1;
    let activeScene = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
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
      const core = createCore(Container, Graphics);
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

      app.stage.addChild(grid, horizon, particlesLayer, track, core);

      const updateScene = (jumpToTarget = false) => {
        const width = app.screen.width;
        const height = app.screen.height;
        const mobile = width < 700;
        const scene = SCENES[activeScene] ?? SCENES[0];

        coreTargetX = width * (mobile ? 0.5 : scene.x);
        coreTargetY = height * (mobile ? scene.mobileY : scene.y);
        coreTargetScale = coreScale * scene.scale;
        coreTargetAlpha = scene.alpha;
        trackTargetAlpha = scene.trackAlpha;

        if (jumpToTarget || coreBaseX === 0) {
          coreBaseX = coreTargetX;
          coreBaseY = coreTargetY;
          coreRenderedScale = coreTargetScale;
          coreRenderedAlpha = coreTargetAlpha;
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
        }

        particles.forEach((particle) => {
          particle.graphic.x = particle.xRatio * width;
          particle.graphic.y = particle.yRatio * height;
        });

        const mobile = width < 700;
        coreScale = mobile
          ? Math.max(0.58, Math.min(0.78, width / 520))
          : Math.max(0.9, Math.min(1.35, width / 1180));
        updateScene(coreBaseX === 0);
        core.position.set(coreBaseX, coreBaseY);
        core.scale.set(coreRenderedScale);
      };

      const onPointerMove = (event) => {
        pointerTargetX = (event.clientX / window.innerWidth - 0.5) * 22;
        pointerTargetY = (event.clientY / window.innerHeight - 0.5) * 16;
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
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });

      app.ticker.maxFPS = reducedMotion.matches ? 24 : 48;
      app.ticker.add((ticker) => {
        const motionFactor = reducedMotion.matches ? 0.35 : 1;
        const deltaSeconds = Math.min(ticker.deltaMS / 1000, 0.05);
        const width = app.screen.width;
        const height = app.screen.height;
        const cell = width < 700 ? 40 : 56;

        elapsed += deltaSeconds * motionFactor;
        pointerX += (pointerTargetX - pointerX) * 0.04;
        pointerY += (pointerTargetY - pointerY) * 0.04;
        scrollPosition += (scrollTarget - scrollPosition) * 0.035;
        coreBaseX += (coreTargetX - coreBaseX) * 0.028;
        coreBaseY += (coreTargetY - coreBaseY) * 0.028;
        coreRenderedScale +=
          (coreTargetScale - coreRenderedScale) * 0.032;
        coreRenderedAlpha +=
          (coreTargetAlpha - coreRenderedAlpha) * 0.032;
        track.alpha += (trackTargetAlpha - track.alpha) * 0.04;

        grid.x = -(elapsed * 18) % cell;
        grid.y = -(scrollPosition * 0.025) % cell;
        horizon.alpha = 0.72 + Math.sin(elapsed * 4.4) * 0.16;
        track.x = -(elapsed * 52) % 240;

        const beat = Math.pow(
          Math.max(0, Math.sin(elapsed * Math.PI * 2 * 1.1)),
          10,
        );

        core.x = coreBaseX + pointerX;
        core.y = coreBaseY + pointerY - (scrollPosition % 120) * 0.03;
        core.rotation = elapsed * (0.08 + activeScene * 0.012);
        core.alpha = coreRenderedAlpha + beat * 0.08;
        core.scale.set(coreRenderedScale * (1 + beat * 0.035));

        core.children.forEach((child, index) => {
          child.rotation +=
            deltaSeconds * motionFactor * (index % 2 === 0 ? 0.22 : -0.3);
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
        window.removeEventListener("pointermove", onPointerMove);
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
