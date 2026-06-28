import styles from "./Button.module.css";

function Button({ children, href, target = "_self" }) {
    return (
        <a
            className={styles.button}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : ""}
        >
            {children}
        </a>
    );
}

export default Button;