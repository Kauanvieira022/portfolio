import styles from "./Navbar.module.css";

import Container from "../../ui/Container";

import navigation from "../../../data/navigation";
import profile from "../../../data/profile";

function Navbar() {
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>{profile.name}</h2>
            <span>{profile.role}</span>
          </div>

          <ul className={styles.menu}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {/* GitHub */}
            {/* LinkedIn */}
            {/* Resume */}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;