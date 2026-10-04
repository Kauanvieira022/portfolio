import { useEffect, useRef } from "react";

const COLORS = {
  code: 0xa8c5ad,
  stack: 0x7fa7a0,
  error: 0xc27f75,
};

const CODE_SNIPPETS = [
  'console.log("Hello, world!")',
  "const ui = <React />;",
  "fetch('/api/projects')",
  "SELECT * FROM projects;",
  "def automate_process():",
  'git commit -m "build with purpose"',
  "return <Portfolio />;",
];

const ERROR_MESSAGES = [
  "TypeError: value is undefined",
  "ReferenceError: identifier not found",
  "404: ROUTE_NOT_FOUND",
  "SQLITE_CONSTRAINT: duplicate key",
  "SyntaxError: unexpected token",
  "ERR_CONNECTION_REFUSED",
  "BUILD_ERROR: dependency missing",
];

const STACK_DEFINITIONS = {
  en: [
    "React // component-based UI",
    "Node.js // backend and REST APIs",
    "Python // process automation",
    "SQL Server // relational data",
    "SQLite // local database",
    "Power BI // dashboards and analysis",
    "Git + GitHub // version control",
    "HTML + CSS // responsive interfaces",
    "CSS Modules // scoped styles",
    "Vite // development and build",
    "ESLint // code quality",
    "Vercel // deployment",
    "Oracle ERP // business systems",
    "Qualitor // service desk",
    "REST APIs // system integration",
    "Relational modeling // structured data",
  ],
  pt: [
    "React // interfaces por componentes",
    "Node.js // backend e APIs REST",
    "Python // automação de processos",
    "SQL Server // dados relacionais",
    "SQLite // banco de dados local",
    "Power BI // dashboards e análise",
    "Git + GitHub // controle de versão",
    "HTML + CSS // interfaces responsivas",
    "CSS Modules // estilos isolados",
    "Vite // desenvolvimento e build",
    "ESLint // qualidade do código",
    "Vercel // deploy",
    "Oracle ERP // sistemas corporativos",
    "Qualitor // gestão de chamados",
    "APIs REST // integração entre sistemas",
    "Modelagem relacional // dados estruturados",
  ],
};

function getMessages(language) {
  const stacks = STACK_DEFINITIONS[language] ?? STACK_DEFINITIONS.en;
  const messages = [];
  const count = Math.max(CODE_SNIPPETS.length, ERROR_MESSAGES.length, stacks.length);

  for (let index = 0; index < count; index += 1) {
    if (CODE_SNIPPETS[index]) {
      messages.push({ text: CODE_SNIPPETS[index], type: "code" });
    }

    if (stacks[index]) {
      messages.push({ text: stacks[index], type: "stack" });
    }

    if (ERROR_MESSAGES[index]) {
      messages.push({ text: ERROR_MESSAGES[index], type: "error" });
    }
  }

  return messages;
}

function setMessage(item, message) {
  item.graphic.text = message.text;
  item.graphic.style.fill = COLORS[message.type];
  item.messageType = message.type;
}

function PixelBackground({ className = "", language = "pt" }) {
  const hostRef = useRef(null);
  const languageRef = useRef(language);
  const textItemsRef = useRef([]);

  useEffect(() => {
    languageRef.current = language;
    const messages = getMessages(language);

    textItemsRef.current.forEach((item) => {
      setMessage(item, messages[item.messageIndex % messages.length]);
    });
  }, [language]);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const random = (() => {
      let value = 2401;

      return () => {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
      };
    })();
    let app;
    let disposed = false;
    let resizeObserver;
    let elapsed = 0;
    let nextMessageIndex = 0;

    const setup = async () => {
      const { Application, Text } = await import("pixi.js");

      if (disposed) {
        return;
      }

      app = new Application();

      await app.init({
        autoStart: false,
        resizeTo: host,
        backgroundAlpha: 0,
        antialias: true,
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

      const width = app.screen.width;
      const height = app.screen.height;
      const messages = getMessages(languageRef.current);
      const isMobile = width < 700;
      const visibleCount = Math.min(messages.length, isMobile ? 9 : 18);
      nextMessageIndex = visibleCount;

      const items = Array.from({ length: visibleCount }, (_, index) => {
        const message = messages[index % messages.length];
        const graphic = new Text({
          text: message.text,
          style: {
            fontFamily: "monospace",
            fontSize: isMobile ? 10 : 13,
            fontWeight: "500",
            fill: COLORS[message.type],
          },
        });
        const yRatio = (index + 0.5 + (random() - 0.5) * 0.3) / visibleCount;
        const item = {
          graphic,
          messageIndex: index,
          messageType: message.type,
          xRatio: random(),
          yRatio,
          speed: 8 + random() * 17,
          phase: random() * Math.PI * 2,
          opacity: isMobile ? 0.17 + random() * 0.08 : 0.22 + random() * 0.12,
        };

        graphic.x = item.xRatio * Math.max(0, width - graphic.width);
        graphic.y = yRatio * Math.max(0, height - graphic.height);
        graphic.alpha = item.opacity;

        return item;
      });

      textItemsRef.current = items;
      app.stage.addChild(...items.map((item) => item.graphic));

      const layout = () => {
        const screenWidth = app.screen.width;
        const screenHeight = app.screen.height;

        items.forEach((item) => {
          item.graphic.x = Math.min(
            item.xRatio * screenWidth,
            Math.max(0, screenWidth - item.graphic.width),
          );
          item.graphic.y = item.yRatio * Math.max(0, screenHeight - item.graphic.height);
        });

        if (reducedMotion.matches) {
          app.render();
        }
      };

      app.ticker.maxFPS = reducedMotion.matches ? 24 : 48;
      app.ticker.add((ticker) => {
        const motionFactor = reducedMotion.matches ? 0.35 : 1;
        const deltaSeconds = Math.min(ticker.deltaMS / 1000, 0.05);
        const screenWidth = app.screen.width;
        const screenHeight = app.screen.height;

        elapsed += deltaSeconds * motionFactor;

        items.forEach((item) => {
          const graphic = item.graphic;

          graphic.x -= item.speed * deltaSeconds * motionFactor;
          graphic.y =
            item.yRatio * Math.max(0, screenHeight - graphic.height) +
            Math.sin(elapsed * 0.7 + item.phase) * 3;
          graphic.alpha = item.opacity * (0.88 + Math.sin(elapsed + item.phase) * 0.12);

          if (graphic.x < -graphic.width - 24) {
            const nextMessages = getMessages(languageRef.current);
            item.messageIndex = nextMessageIndex % nextMessages.length;
            nextMessageIndex += 1;
            setMessage(item, nextMessages[item.messageIndex]);
            graphic.x = screenWidth + 24;
          }
        });
      });

      app.start();

      const onMotionPreferenceChange = () => {
        app.ticker.maxFPS = reducedMotion.matches ? 24 : 48;
        app.start();
      };

      reducedMotion.addEventListener("change", onMotionPreferenceChange);
      resizeObserver = new ResizeObserver(layout);
      resizeObserver.observe(host);
      layout();

      app.cleanupCodeBackground = () => {
        reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      };
    };

    setup();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      app?.cleanupCodeBackground?.();
      textItemsRef.current = [];

      if (app?.renderer) {
        app.destroy(true, { children: true });
      }
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}

export default PixelBackground;
