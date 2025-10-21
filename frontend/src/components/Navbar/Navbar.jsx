import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoNavbar}>Clínica Nexus</div>

            <ul className={styles.navbarLinks}>
                <li><Link to="/recepcao" className={styles.link}>Recepção</Link></li>
                <li><Link to="/ala-medica" className={styles.link}>Ala Médica</Link></li>
                <li><Link to="/administracao" className={styles.link}>Administração</Link></li>
            </ul>
        </nav>
    );
}
