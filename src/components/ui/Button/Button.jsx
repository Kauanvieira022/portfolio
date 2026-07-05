import styles from "./Button.module.css";

function Button({ children, href, target = "_self", variant = "primary", className = "" }) {
  const classes = `${styles.button} ${styles[variant] ?? styles.primary} ${className}`.trim();

  return (
    <a
      className={classes}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default Button;
