import styles from "./Button.module.css";

function Button({ children, href, target = "_self", variant = "primary" }) {
  const className = `${styles.button} ${styles[variant] ?? styles.primary}`;

  return (
    <a
      className={className}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default Button;
