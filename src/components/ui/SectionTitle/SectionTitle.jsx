import styles from "./SectionTitle.module.css";

function SectionTitle({ title, subtitle }) {
    return (
        <div className={styles.wrapper}>
            <span>{subtitle}</span>
            <h2>{title}</h2>
        </div>
    );
}

export default SectionTitle;